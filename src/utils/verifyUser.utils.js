const { verifyToken } = require('./Authentication.utils');
const createError = require('./error.utils');

module.exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.data.id === req.params.id || req.data.isAdmin) return next();
    if(error) return next(createError(403, "You are not authourise"));
  })
}

// module.exports.verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if(req.data.isAdmin) {
//       return next();
//     };
//     if(error) return next(createError(403, "You are not authourise"));
//   })
// }

module.exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};