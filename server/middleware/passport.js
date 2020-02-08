const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../models/user.model");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use("local", LocalStrategy);

module.exports = passport;
