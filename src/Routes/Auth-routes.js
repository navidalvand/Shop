const app = require('express').Router()
const { checkLogin } = require('../middlewares/auto_login');
const { registerValidation, loginValidation } = require('../validation/auth-validation');
const {AuthController} = require('../Controllers/Auth/Auth-controller');



app.post("/register" , registerValidation() , AuthController.singUp)
app.post("/login" , loginValidation() , AuthController.logIn)
app.post("/logout" , checkLogin , AuthController.logOut)










module.exports = {
    authRoutes : app
}
