const User = require("../models/user.model");
const passport = require("../passport/index");

async function getAllUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

async function getUser(req, res) {
  const user = await User.findById(req.params.id);
  res.json(user);
}

async function createUser(req, res) {
  const {
    email,
    name,
    phone,
    location,
    password,
    password_confirmation,
    isUser
  } = req.body;

  const user = new User({
    email,
    name,
    phone,
    location,
    password,
    isUser
  });
  await user.save();
  res.json("User saved.");
}

async function updateUser(req, res) {
  const { email, name, phone, location, password, isUser } = req.body;
  const newUser = {
    email,
    name,
    phone,
    location,
    password,
    isUser
  };
  await User.findByIdAndUpdate(req.params.id, newUser);
  res.json({
    status: "User updated."
  });
}

async function deleteUser(req, res) {
  await User.findByIdAndRemove(req.params.id);
  res.json({
    status: "User deleted."
  });
}

function userLogin(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({ id: user._id });
    });
  })(req, res, next);
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userLogin
};
