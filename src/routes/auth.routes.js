const express = require('express')

const router = express.Router();

const User = require('../controllers/Auth.controllers')

router.post('/register', User.Register);
router.post('/login', User.Login);
router.post('/logout', User.Logout);

module.exports = router;