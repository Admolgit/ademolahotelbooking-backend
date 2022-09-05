const express = require("express");

const router = express.Router();

const User = require("../controllers/User.controllers");
const { verifyToken } = require("../utils/Authentication.utils");
const { verifyUser, verifyAdmin } = require("../utils/verifyUser.utils");

router.get('/verify', verifyToken, (req, res, next) => {
  res.send("Welcome user")
});

router.get('/verifyuser/:id', verifyUser, (req, res, next) => {
  res.send("Welcome user, you can delete and update your details")
});

router.get('/verifyadmin/:id', verifyAdmin, (req, res, next) => {
  res.send("Welcome admin, you can delete and update all details")
});

router.put("/user/:id", verifyToken, User.updateUser);
router.delete("/user/:id", verifyToken, User.deleteUser);
router.get("/user/:id", verifyToken, User.getUser);
router.get("/users", verifyToken, User.getUsers);

module.exports = router;