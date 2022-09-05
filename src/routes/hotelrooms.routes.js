const express = require("express");
const Room = require("../controllers/Rooms.controllers");
const { verifyAdmin } = require("../utils/verifyUser.utils");

const router = express.Router();

router.post("/user/:id", Room.createRoom);
router.put("/availabilityroom/:id", Room.updateRoomAvailability); // update availability
router.put("/:id", verifyAdmin, Room.updateRoom); //Admin Room update
router.put("/rooms/:roomId", Room.updateRoomsAvailability);
router.delete("/:id/:hotelid", verifyAdmin, Room.deleteRoom);
router.get("/:id", Room.getRoom);
router.get("/", Room.getRooms);

module.exports = router;