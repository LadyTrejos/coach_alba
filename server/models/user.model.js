const mongoose = require("mongoose");
const Schema = mongoose.Schema;

bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    name: { type: String, trim: true, required: true },
    phone: { type: Number, required: true },
    id_phone: { type: Number, required: true },
    location: {
      country: { type: String },
      state: { type: String },
      city: { type: String }
    },
    password: { type: String, required: true },
    isUser: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
