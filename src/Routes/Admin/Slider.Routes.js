const { SliderAdminController } = require("../../Controllers/Admin/Slider.Controller");
const { upload } = require("../../Utils/multer");
const { createSliderValidation } = require("../../validation/slider-validation");

const router = require("express").Router();


//!
router.post(
  "/create",
  upload.single("image"),
  createSliderValidation(),
  SliderAdminController.createSlider
);

//!
router.delete("/delete/:id", SliderAdminController.deleteSlider);

//!
router.patch(
  "/update",
  upload.single("image"),
  createSliderValidation(),
  SliderAdminController.updateSlider
);

//!
router.get("/all", SliderAdminController.getSlidersList);
module.exports = {
  adminsRouter: router,
};




module.exports = {
  SliderRoutes: router,
};
