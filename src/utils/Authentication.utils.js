const jwt = require('jsonwebtoken');
const createError = require('./error.utils');


module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token) return next(createError(401, "You are not allowed to access this endpoint."));

  jwt.verify(token, process.env.JWT, (error, data) => {
    if(error) return next(createError(401, "Invalid token."));
    req.data = data;
  });

  next();
}