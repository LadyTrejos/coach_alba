const express = require("express");
const router = express.Router();
const { userValidationRules, validate } = require("../validator");
const isAuthenticated = require("../middleware/isAuthenticated");
const UserController = require("../controllers/user");

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

router.post(
  "/register",
  userValidationRules(),
  validate,
  UserController.createUser
);

router.post("/login", UserController.userLogin);

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "User logged out." });
  } else {
    res.send({ msg: "No user to log out." });
  }
});
module.exports = router;
