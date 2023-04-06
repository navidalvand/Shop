const router = require("express").Router();
const { AdminController } = require("../../Controllers/Admin/Admin-controller");
const { upload } = require("../../Utils/multer");
const { checkOwnerRole } = require("../../middlewares/owner_role");
const { registerValidation } = require("../../validation/auth-validation");
const { productvalidation } = require("../../validation/product-validation");



//!                                                       Create User In Panel Admin "Route"
router.post("/create-user", registerValidation(), AdminController.createUser);


//!                                                       Update User By ID In Panel Admin "Route"
router.patch("/update-user/:id" , AdminController.updateUser);


//!                                                       Get User By ID In Panel Admin "Route"
router.get("/user/:id", AdminController.getUserByID);


//!                                                       Get All Users In Panel Admin "Route"
router.get("/all-users", AdminController.getUsersList);


//!                                                       Delete User By ID In Panel Admin "Route"
router.delete("/delete-user/:id", AdminController.deleteUser);


//!                                                      Update User's Role By ID In Panel Admin "Route" 
router.patch(
  "/role-update/:id",
  checkOwnerRole,
  AdminController.changeUserRole
);


//!                                                       Create Product In Panel Admin "Route"
router.post(
  "/create-product",
  upload.array("images", 12),
  productvalidation(),
  AdminController.createProduct
);


//!                                                       Get All Products In Panel Admin "Route"
router.get("/all-products", AdminController.getProductsList);


//!                                                       Get Product By ID In Panel Admin "Route"
router.get("/product/:id", AdminController.getProductByID);


//!                                                       Accept Product By ID In Panel Admin "Route"
router.get("/accept-product/:id", AdminController.acceptProduct);


//!                                                        Reject Product By ID In Panel Admin "Route"
router.get("/reject-product/:id", AdminController.rejectProduct);


//!                                                        Delete Product By ID In Panel Admin "Route"
router.delete("/delete-product/:id", checkOwnerRole , AdminController.deleteProduct);


//!                                                        Update Product By ID In Panel Admin "Route"
router.patch("/update-product/:id", upload.array("images", 12) , AdminController.updateProduct);


//!                                                       
router.post("/create-product", AdminController.createProduct);


//!                                                       
router.post("/create-category", AdminController.createCategory);


//!                                                       
router.delete("/delete-category", AdminController.deleteCategory);


//!                                                       
router.patch("/update-category", AdminController.updateCategory);


//!                                                       
router.get("/all-categories", AdminController.getCategoriesList);


//!                                                       
router.post("/create-comment", AdminController.createComment);


//!                                                       
router.delete("/delete-comment", AdminController.deleteComment);


//!                                                       
router.get("/all-comments", AdminController.getCommentsList);


//!                                                       
router.post("/create-slider", AdminController.createSlider);


//!                                                       
router.delete("/delete-slider", AdminController.deleteSlider);


//!                                                       
router.patch("/update-slider", AdminController.updateSlider);


//!                                                       
router.get("/all-sliders", AdminController.getSlidersList);
module.exports = {
  adminsRouter: router,
};
