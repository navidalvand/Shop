const router = require("express").Router();
const { CategoryRoutes } = require("./Category.Routes");
const { CommentRoutes } = require("./Comment.Routes");
const { ProductRoutes } = require("./Product.Routes");
const { SliderRoutes } = require("./Slider.Routes");
const { UserRoutes } = require("./User.Routes");

router.use("/users", UserRoutes);
router.use("/categories", CategoryRoutes)
router.use("/Sliders", SliderRoutes)
router.use("/Comments", CommentRoutes)
router.use("/Products", ProductRoutes)

module.exports = {
  AdminRoutes: router,
};
