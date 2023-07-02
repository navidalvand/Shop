const router = require("express").Router();
const {
  UserAdminController,
} = require("../../Controllers/Admin/User.Controller");
const { checkOwnerRole } = require("../../middlewares/owner_role");
const { registerValidation } = require("../../validation/auth-validation");

//!                                                       Create User In Panel Admin "Route"
router.post("/create", registerValidation(), UserAdminController.createUser);

//!                                                       Update User By ID In Panel Admin "Route"
router.patch("/update/:id", UserAdminController.updateUser);

//!                                                       Get User By ID In Panel Admin "Route"
router.get("/:id", UserAdminController.getUserByID);

//!                                                       Get All Users In Panel Admin "Route"
router.get("/all", UserAdminController.getUsersList);

//!                                                       Delete User By ID In Panel Admin "Route"
router.delete("/delete/:id", UserAdminController.deleteUser);

//!                                                      Update User's Role By ID In Panel Admin "Route"
router.patch(
  "/change-role/:id",
  checkOwnerRole,
  UserAdminController.changeUserRole
);

module.exports = {
  UserRoutes: router,
};
