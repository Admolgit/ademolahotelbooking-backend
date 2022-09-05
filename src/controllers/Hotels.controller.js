const Hotels = require('../models/Hotels.models');
const createError = require('../utils/error.utils');
const Rooms = require('../models/Rooms.models')

const createHotel = async (req, res) => {

  const newHotel = new Hotels(req.body);
  try {

    const savedHotel = await newHotel.save();

    res.status(201).json({
      message: 'Hotel created successfully',
      hotel: savedHotel,
    });
  } catch (error) {
    next(error);
    // res.status(500).json({ error: error })
  };
};

const UpdateHotel = async (req, res) => {

  const id = req.params.id;
  try {

    const updateHotel = await Hotels.findByIdAndUpdate(id, {
      $set: req.body
    },
    {
      new: true,
    });

    res.status(200).json({
      message: 'Hotel updated successfully',
      hotel: updateHotel,
    });
  } catch (error) {
    // res.status(500).json({ error: error });
    next(error);
  };
};

const deleteHotel = async (req, res, next) => {
  
  const id = req.params.id;
  
  try {

    await Hotels.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Hotel deleted successfully',
    });
  } catch (error) {
    // res.status(500).json({ error: error });
    next(error);
  };
};

const getHotel = async (req, res, next) => {

  const id = req.params.id;

  try {

    const hotel = await Hotels.findById(id);

    res.status(200).json({
      message: 'Hotel fetched successfully',
      hotel: hotel,
    });
  } catch (error) {
    // res.status(500).json({ error: error });
    next(error);
  };
};

const getHotels = async (req, res, next) => {

  const { min, max, ...others } = req.query

  try {

    const hotels = await Hotels.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 }
    }).limit(req.query.limit);

    res.status(200).json({
      message: 'Hotel fetched successfully',
      hotel: hotels,
    });
  } catch (error) {
    next(error)
  };
};

const countByCity = async (req, res, next) => {

  const cities = req.query.cities.split(',');

  try {

    const cityCounts = await Promise.all(cities.map(city => {
      return Hotels.countDocuments({
        city: city,
      })
    }));

    res.status(200).json({
      message: 'Number of cities: ' + cityCounts.join(','),
      cityCounts,
    });
  } catch (error) {
    next(error)
  };
};

const countByType = async (req, res, next) => {

  try {
    const hotelCounts = await Hotels.countDocuments({ type: 'hotel'});
    const appartmentCounts = await Hotels.countDocuments({ type: 'appartment'});
    const resortCounts = await Hotels.countDocuments({ type: 'resort'});
    const villaCounts = await Hotels.countDocuments({ type: 'villa'});
    const cabinCounts = await Hotels.countDocuments({ type: 'cabin'});

    res.status(200).json([
      { type: 'hotel', count: hotelCounts },
      { type: 'appartment', count: appartmentCounts },
      { type: 'resort', count: resortCounts },
      { type: 'villa', count: villaCounts },
      { type: 'cabin', count: cabinCounts },
    ])
  } catch (error) {
    next(error)
  };
};

const getRooms = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.hotelId);
    const roomList = await Promise.all(hotel.rooms.map(room => {
      return Rooms.findById(room);
    }));
    res.status(200).json({
      list: roomList,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createHotel,
  UpdateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getRooms,
}