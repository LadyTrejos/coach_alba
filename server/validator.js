const { check, validationResult } = require("express-validator");
const User = require("./models/user.model");

const userValidationRules = () => {
  return [
    check("email", "El correo electrónico es requerido.").notEmpty(),
    check("email", "El correo electrónico no es válido.").isEmail(),
    check("name", "El nombre es requerido.").notEmpty(),
    check("password", "Se requiere una contraseña.").notEmpty(),
    check("email").custom(value => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject("Este correo ya está en uso.");
        } else {
          return true;
        }
      });
    }),
    check("password").custom((value, { req }) => {
      if (value !== req.body.password_confirmation) {
        throw new Error("La confirmación de la contraseña no coincide.");
      } else {
        return true;
      }
    })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  userValidationRules,
  validate
};
