const {
  UserAdminController,
} = require("../../Controllers/Admin/User.Controller");
const { checkOwnerRole } = require("../../middlewares/owner_role");
const { registerValidation } = require("../../validation/auth-validation");
const router = require("express").Router();

//!                                                       Create User In Panel Admin "Route"
router.post("/create", registerValidation(), UserAdminController.createUser);

//!                                                       Update User By ID In Panel Admin "Route"
router.patch("/update-user/:id", UserAdminController.updateUser);

//!                                                       Get User By ID In Panel Admin "Route"
router.get("/user/:id", UserAdminController.getUserByID);

//!                                                       Get All Users In Panel Admin "Route"
router.get("/all-users", UserAdminController.getUsersList);

//!                                                       Delete User By ID In Panel Admin "Route"
router.delete("/delete-user/:id", UserAdminController.deleteUser);

//!                                                      Update User's Role By ID In Panel Admin "Route"
router.patch(
  "/role-update/:id",
  checkOwnerRole,
  UserAdminController.changeUserRole
);

module.exports = {
  UserRoutes: router,
};
