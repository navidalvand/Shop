const router = require('express').Router()
const {AdminController} = require('../../Controllers/Admin/Admin-controller')
const { checkAdminRole } = require('../../middlewares/admin_role')
const { checkOwnerRole } = require('../../middlewares/owner_role')





router.post("/create-user", checkAdminRole , AdminController.createUser)
router.patch("/update-user", checkAdminRole , AdminController.updateUser)
router.get("/user/:username" , checkAdminRole , AdminController.getUserByUserName)
router.get("/all-users" , checkAdminRole , AdminController.getUsersList)
router.delete("/delete-user/:username" , checkAdminRole , AdminController.deleteUser)
router.patch("/role-update" , checkOwnerRole , AdminController.changeUserRole)
router.get("/all-products" , checkAdminRole , AdminController.getProductsList)
router.get("/product/:id" , checkAdminRole , AdminController.getProductByID)
router.get("/accept-product/:id" , checkAdminRole , AdminController.acceptProduct)
router.delete("/reject-product/:id" , checkAdminRole , AdminController.rejectProduct)
router.delete("/delete-product" , checkAdminRole , AdminController.deleteProduct)
router.patch("/update-product" , checkAdminRole , AdminController.updateProduct)
router.post("/create-product" , checkAdminRole , AdminController.createProduct)
router.post("/create-category" , checkAdminRole , AdminController.createCategory)
router.delete("/delete-category" , checkAdminRole , AdminController.deleteCategory)
router.patch("/update-category" , checkAdminRole , AdminController.updateCategory)
router.get("/all-categories" , checkAdminRole , AdminController.getCategoriesList)
router.post("/create-comment" , checkAdminRole , AdminController.createComment)
router.delete("/delete-comment" , checkAdminRole , AdminController.deleteComment)
router.get("/all-comments" , checkAdminRole , AdminController.getCommentsList)
router.post("/create-slider" , checkAdminRole , AdminController.createSlider)
router.delete("/delete-slider" , checkAdminRole , AdminController.deleteSlider)
router.patch("/update-slider" , checkAdminRole , AdminController.updateSlider)
router.get("/all-sliders" , checkAdminRole , AdminController.getSlidersList)













module.exports = {
    adminsRouter : router
}
