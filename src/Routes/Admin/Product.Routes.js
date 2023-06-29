const { ProductAdminController } = require("../../Controllers/Admin/Product.cotroller");
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
router.get("/all-products", ProductAdminController.getProductsList);

//!                                                       Get Product By ID In Panel Admin "Route"
router.get("/product/:id", ProductAdminController.getProductByID);

//!                                                       Accept Product By ID In Panel Admin "Route"
router.get("/accept-product/:id", ProductAdminController.acceptProduct);

//!                                                        Reject Product By ID In Panel Admin "Route"
router.get("/reject-product/:id", ProductAdminController.rejectProduct);

//!                                                        Delete Product By ID In Panel Admin "Route"
router.delete(
  "/delete-product/:id",
  checkOwnerRole,
  ProductAdminController.deleteProduct
);

//!                                                        Update Product By ID In Panel Admin "Route"
router.patch(
  "/update-product/:id",
  upload.array("images", 12),
  ProductAdminController.updateProduct
);




module.exports = {
  ProductRoutes: router,
};
