const Users = require('../models/User.models');
const createError = require('../utils/error.utils')

const updateUser = async (req, res) => {

  const id = req.params.id;
  try {

    const updateUser = await Users.findByIdAndUpdate(id, {
      $set: req.body
    },
    {
      new: true,
    });

    res.status(200).json({
      message: 'User updated successfully',
      user: updateUser,
    });
  } catch (error) {
    // res.status(500).json({ error: error });
    next(error);
  };
};

const deleteUser = async (req, res, next) => {
  
  const id = req.params.id;
  
  try {

    await Users.findByIdAndDelete(id);

    res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    // res.status(500).json({ error: error });
    next(error);
  };
};

const getUser = async (req, res, next) => {

  const id = req.params.id;

  try {

    const user = await Users.findById(id);

    res.status(200).json({
      message: 'User fetched successfully',
      user: user,
    });
  } catch (error) {
    // res.status(500).json({ error: error });
    next(error);
  };
};

const getUsers = async (req, res, next) => {

  // const failed = true;

  // if(failed) return next(createError(401, 'Invalid request'));

  try {

    const users = await Users.find();

    res.status(200).json({
      message: 'User fetched successfully',
      user: users,
    });
  } catch (error) {
    next(error)
  };
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
}