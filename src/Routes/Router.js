const router = require("express").Router();
const { APIsRouter } = require("./API/API.Routes");
const { pagesRouter } = require("./Pages/Page.Routes");
const { AdminRoutes } = require("./Admin/Admin.Routes");
const { AuthRoutes } = require("./Auth/Auth.Routes");
const { autoLogin } = require("../middlewares/auto_login");
const { checkAdminRole } = require("../middlewares/admin_role");

//!                               Auth Routes
router.use("/auth", AuthRoutes);

//!                               API Routes
router.use("/api", autoLogin, APIsRouter);

//!                               Admin Routes
router.use("/admin", autoLogin, checkAdminRole, AdminRoutes);

//!                               Pages Routes
router.use("/pages", pagesRouter);

module.exports = {
  mainRoutes: router,
};
