const { body } = require("express-validator");

function productvalidation() {
  return [
    body("title")
      .notEmpty()
      .isString()
      .trim()
      .isLength({ max: 60, min: 8 })
      .withMessage("title is not valid"),
    body("description")
      .notEmpty()
      .isString()
      .isLength({ min: 20, max: 500 })
      .withMessage("description is not valid"),
    body("category")
      .notEmpty()
      .isString()
      .withMessage("category is not valid"),
    body("images").isArray(),
    body("type"),
    body("city"),
    body("address"),
    body("price"),
    body("contact"),
  ];
}

module.exports = {
  productvalidation,
};
