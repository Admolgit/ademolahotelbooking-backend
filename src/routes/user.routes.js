const express = require("express");

const UserRoutes = express.Router();

const User = require("../controllers/User.controllers");
const { verifyToken } = require("../utils/Authentication.utils");
const { verifyUser, verifyAdmin } = require("../utils/verifyUser.utils");

UserRoutes.get('/verify', verifyToken, (req, res, next) => {
  res.send("Welcome user")
});

UserRoutes.get('/verifyuser/:id', verifyUser, (req, res, next) => {
  res.send("Welcome user, you can delete and update your details")
});

UserRoutes.get('/verifyadmin/:id', verifyAdmin, (req, res, next) => {
  res.send("Welcome admin, you can delete and update all details")
});

UserRoutes.put("/user/:id", User.updateUser);
UserRoutes.delete("/user/:id", verifyToken, User.deleteUser);
UserRoutes.get("/user/:id", verifyToken, User.getUser);
UserRoutes.get("/users", User.getUsers);

module.exports = UserRoutes;