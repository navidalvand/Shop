const { commentRoutes } = require('./Comment.Routes')
const { productRoutes } = require('./Product.Routes')
const { userRoutes } = require('./User.Routes')

const app = require('express').Router()


//!                           User Routes
app.use("/user" , userRoutes)

//!                           Product Routes
app.use("/product" , productRoutes)

//!                           Comment Routes
app.use("/comment" , commentRoutes)












module.exports = {
    APIsRouter : app
}
