const { body } = require("express-validator");

function createSliderValidation() {
  return [
    body("title")
      .notEmpty()
      .isLength({ min: 4, max: 30 })
      .isString()
      .withMessage("title is not valid"),
    body("type").notEmpty().isString().withMessage("type is not valid"),
  ];
}

module.exports = {
    createSliderValidation
}
