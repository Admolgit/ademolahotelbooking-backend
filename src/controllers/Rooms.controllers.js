const Rooms = require("../models/Rooms.models");
const Hotel = require("../models/Hotels.models");
// import { createError } from "../utils/error.js";

module.exports.createRoom = async (req, res, next) => {
  const id = req.params.id;
  const newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      const hotel = await Hotel.findByIdAndUpdate(id, {
        $push: { rooms: savedRoom.id },
      });
      console.log(hotel)
    } catch (err) {
      next(err);
    }
    res.status(200).json({
      Room: savedRoom,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateRoom = async (req, res, next) => {
  try {

    const updatedRoom = await Rooms.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ updatedRoom: updatedRoom });
  } catch (err) {
    next(err);
  }
};

module.exports.updateRoomAvailability = async (req, res, next) => {
  try {
    await Rooms.findByIdAndUpdate(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

module.exports.updateRoomsAvailability = async (req, res, next) => {
  try {
    const roomDates = await Rooms.updateOne(
      { "roomNumbers._id": req.params.roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json({message: "Room status has been updated.", data: roomDates });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteRoom = async (req, res, next) => {
  const id = req.params.hotelid;
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(id, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

module.exports.getRoom = async (req, res, next) => {
  try {
    const room = await Rooms.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
module.exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};