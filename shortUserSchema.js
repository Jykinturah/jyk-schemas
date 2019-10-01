module.exports = function(mongoose) {

  var shortUserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    }
  });

  shortUserSchema.pre('save',function(next) {
    var user = this;
    bcrypt.hash(user.password,14,function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    })
  });

  shortUserSchema.static('authenticate',function(username,password,callback){
    User.findOne({ username: username })
      .exec(function(err,user){
        if(err) return callback(err);
        else if(!user) {
          var err = new Error('PRINCIPALITY DENIED (TANGENTIAL)');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password,user.password,function(err,result){
          if(result === true) return callback(null, user);
          else return callback();
        })
      });
  }

  return mongoose.model('shortUser', shortUserSchema);
};