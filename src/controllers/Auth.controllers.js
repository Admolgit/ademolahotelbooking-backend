const Users = require('../models/User.models');
const createError = require('../utils/error.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async (req, res, next) => {

  try {
    const newUser = new Users({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUserData = await newUser.save()
    
    res.status(201).json({
      message: 'User account created successfully',
      user: newUserData,
    });
  } catch (error) {
    next(error);
  }
}

const Login = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      user_name: req.body.user_name,
    });

    if(!user) return next(createError(404, "User not found"));

    const userPassword = await bcrypt.compare(req.body.password, user.password);
    if (!userPassword) return next(createError(404, "Incorrect password or email provided"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

    const {user_name, email, _id, createdAt, updatedAt} = user;

    const oneUser = {
      _id,
      user_name,
      email,
      createdAt,
      updatedAt
    }

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({
      message: 'Login Successful',
      user: oneUser,
      access_token: token,
    })

  } catch (error) {
    next(error);
  }
}

const Logout = (req, res, next) => {
  res.send('Looged User Out');
}

module.exports = {
  Register,
  Login,
  Logout,
}