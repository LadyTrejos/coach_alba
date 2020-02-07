const express = require("express");
const router = express.Router();
const { userValidationRules, validate } = require("../validator");
const UserController = require("../controllers/user");

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

router.post("/login");

router.post(
  "/register",
  userValidationRules(),
  validate,
  UserController.createUser
);

module.exports = router;
