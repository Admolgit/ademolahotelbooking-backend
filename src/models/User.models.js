const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},{
  timestamps: true,
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {

      if (saltError) {
        return next(saltError);
      } else {

        bcrypt.hash(user.password, salt, (hashError, hash) => {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      };
    });
  } else {
    return next();
  }
});

UserSchema.statics.findByToken=function(token,cb){
  var user=this;

  jwt.verify(token,confiq.SECRET,function(err,decode){
      user.findOne({"_id": decode, "token":token},function(err,user){
          if(err) return cb(err);
          cb(null,user);
      });
  });
  next()
};

UserSchema.methods.deleteToken=function(token,cb){
  var user=this;

  user.update({$unset : {token : 1}},function(err,user){
      if(err) return cb(err);
      cb(null,user);
  });
  next()
}

const Users = mongoose.model('users', UserSchema);

module.exports = Users;