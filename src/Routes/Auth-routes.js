const router = require('express').Router()
const { checkLogin } = require('../middlewares/auto_login');
const { registerValidation, loginValidation } = require('../validation/auth-validation');
const {AuthController} = require('../Controllers/Auth/Auth-controller');



router.post("/register" , registerValidation() , AuthController.singUp)
router.post("/login" , loginValidation() , AuthController.logIn)
router.post("/logout" , checkLogin , AuthController.logOut)










module.exports = {
    authRoutes : router
}
