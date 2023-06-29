const router = require('express').Router()
const { autoLogin } = require('../../middlewares/auto_login');
const { registerValidation, loginValidation } = require('../../validation/auth-validation');
const {AuthController} = require('../../Controllers/Auth/Auth-controller');


//!                                                                         Register Controller
router.post("/register" , registerValidation() , AuthController.singUp)


//!                                                                         Login Controller
router.post("/login" , loginValidation() , AuthController.logIn)


//!                                                                         Logout Controller
router.post("/logout" , autoLogin , AuthController.logOut)










module.exports = {
    AuthRoutes : router
}
