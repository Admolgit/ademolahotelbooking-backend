const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const AuthRoutes = require("./src/routes/auth.routes");
const hotelsRoutes = require("./src/routes/hotels.routes");
const hotelRoomsRoutes = require("./src/routes/hotelrooms.routes");
const UserRoutes = require("./src/routes/user.routes");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Middlewares
app.use('/api', AuthRoutes);
app.use('/api', hotelsRoutes);
app.use('/api', hotelRoomsRoutes);
app.use('/api', UserRoutes);

// Middlewares for more specific error handling
app.use((error, req, res, next) => {
  const errorState = error.status || 500;
  const errorMessage = error.message || "Something went wrong"
  return res.status(errorState).json({
    success: false,
    status: errorState,
    message: errorMessage,
    stack: error.stack,
  });
});

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
  console.log("Connected to database");
});

const PORT = `${process.env.PORT || 3000}`;

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
} 
);

module.exports = app;