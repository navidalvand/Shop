const router = require("express").Router();
const { AdminController } = require("../../Controllers/Admin/Admin-controller");
const { upload } = require("../../Utils/multer");
const { checkOwnerRole } = require("../../middlewares/owner_role");
const { registerValidation } = require("../../validation/auth-validation");
const { productvalidation } = require("../../validation/product-validation");

router.post("/create-user", registerValidation(), AdminController.createUser);
router.patch("/update-user/:id", AdminController.updateUser);
router.get("/user/:id", AdminController.getUserByID);
router.get("/all-users", AdminController.getUsersList);
router.delete("/delete-user/:id", AdminController.deleteUser);
router.patch(
  "/role-update/:id",
  checkOwnerRole,
  AdminController.changeUserRole
);
router.post(
  "/create-product",
  upload.array("images", 12),
  productvalidation(),
  AdminController.createProduct
);
router.get("/all-products", AdminController.getProductsList);
router.get("/product/:id", AdminController.getProductByID);
router.get("/accept-product/:id", AdminController.acceptProduct);
router.delete("/reject-product/:id", AdminController.rejectProduct);
router.delete("/delete-product", AdminController.deleteProduct);
router.patch("/update-product", AdminController.updateProduct);
router.post("/create-product", AdminController.createProduct);
router.post("/create-category", AdminController.createCategory);
router.delete("/delete-category", AdminController.deleteCategory);
router.patch("/update-category", AdminController.updateCategory);
router.get("/all-categories", AdminController.getCategoriesList);
router.post("/create-comment", AdminController.createComment);
router.delete("/delete-comment", AdminController.deleteComment);
router.get("/all-comments", AdminController.getCommentsList);
router.post("/create-slider", AdminController.createSlider);
router.delete("/delete-slider", AdminController.deleteSlider);
router.patch("/update-slider", AdminController.updateSlider);
router.get("/all-sliders", AdminController.getSlidersList);

module.exports = {
  adminsRouter: router,
};
