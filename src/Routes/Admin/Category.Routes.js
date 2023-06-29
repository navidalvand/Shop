const { CategoryAdminController } = require("../../Controllers/Admin/Category.controller");

const router = require("express").Router();





//!                                                       Create Category In Panel Admin "Route"
router.post("/create", CategoryAdminController.createCategory);

//!                                                       Delete Category By ID In Panel Admin "Route"
router.delete("/delete/:id", CategoryAdminController.deleteCategory);

//!                                                       Update Category By ID In Panel Admin "Route"
router.patch("/update/:id", CategoryAdminController.updateCategory);

//!                                                       Get All Categories In Panel Admin "Route"
router.get("/all", CategoryAdminController.getCategoriesList);



module.exports = {
  CategoryRoutes: router,
};
