const express = require("express");

const router = express.Router();

const Hotel = require("../controllers/Hotels.controller");

router.post("/hotels", Hotel.createHotel);
router.put("/hotels/:id", Hotel.UpdateHotel);
router.delete("/hotels/:id", Hotel.deleteHotel);
router.get("/hotels/:id", Hotel.getHotel);
router.get("/hotels", Hotel.getHotels);
router.get("/count-by-city", Hotel.countByCity);
router.get("/count-by-type", Hotel.countByType);
router.get("/room/:hotelId", Hotel.getRooms);

module.exports = router;
