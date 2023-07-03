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
      .isLength({ min: 6, max: 500 })
      .withMessage("description is not valid"),
    body("category").notEmpty().isString().withMessage("category is not valid"),
    body("type")
      .notEmpty()
      .isString()
      .trim()
      .custom((value) => {
        if (value != "sell" && value != "buy" && value != "exchange")
          throw { status: 400, message: "type is not valid" };
        return true;
      })
      .withMessage("type is not valid"),
    body("city").notEmpty().isString().trim().withMessage("city is not valid"),
    body("address")
      .notEmpty()
      .isString()
      .trim()
      .isLength({ min: 6, max: 200 })
      .withMessage("address is not valid"),
    body("price")
      .notEmpty()
      .isString()
      .trim()
      .withMessage("price is not valid"),
    body("contact")
      .notEmpty()
      .isString()
      .isLength({ min: 6, max: 200 })
      .withMessage("contact is not valid"),
  ];
}

module.exports = {
  productvalidation,
};
