const { body } = require("express-validator");

function registerValidation() {
  return [
    body("username")
      .notEmpty()
      .isLength({ min: 4, max: 14 })
      .isString()
      .withMessage("username is not valid"),
    body("email").notEmpty().isEmail().withMessage("email is not valid"),
    body("phoneNumber")
      .notEmpty()
      .isMobilePhone("fa-IR")
      .withMessage("phone number is not valid"),
    body("password")
      .notEmpty()
      .isLength({ min: 6, max: 20 })
      .withMessage("password is not valid")
      .custom((value, ctx) => {
        if (value != ctx?.req?.body?.confirm_password)
          throw "password is not the same with confirm password";
        return true;
      }),
  ];
}

function loginValidation() {
  return [
    body("username")
      .notEmpty()
      .isString()
      .isLength({ min: 4, max: 14 })
      .withMessage("username is not valid"),
    body("password").notEmpty().isString().withMessage("password is not valid"),
  ];
}

module.exports = {
  registerValidation,
  loginValidation
};
