const {
  ProductAdminController,
} = require("../../Controllers/Admin/Product.cotroller");
const { upload } = require("../../Utils/multer");
const { checkOwnerRole } = require("../../middlewares/owner_role");
const { productvalidation } = require("../../validation/product-validation");
const router = require("express").Router();

//!                                                       Create Product In Panel Admin "Route"
router.post(
  "/create",
  upload.array("images", 12),
  productvalidation(),
  ProductAdminController.createProduct
);

//!                                                       Get All Products In Panel Admin "Route"
router.get("/all", ProductAdminController.getProductsList);

//!                                                       Accept Product By ID In Panel Admin "Route"
router.get("/accept/:id", ProductAdminController.acceptProduct);

//!                                                        Reject Product By ID In Panel Admin "Route"
router.get("/reject/:id", ProductAdminController.rejectProduct);

//!                                                        Delete Product By ID In Panel Admin "Route"
router.delete(
  "/delete/:id",
  checkOwnerRole,
  ProductAdminController.deleteProduct
);

//!                                                        Update Product By ID In Panel Admin "Route"
router.patch(
  "/update/:id",
  upload.array("images", 12),
  ProductAdminController.updateProduct
);

//!                                                       Get Product By ID In Panel Admin "Route"
router.get("/:id", ProductAdminController.getProductByID);

module.exports = {
  ProductRoutes: router,
};
