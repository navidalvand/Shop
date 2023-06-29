const { commentRoutes } = require('./Comment-routes')
const { productRoutes } = require('./Product-routes')
const { userRoutes } = require('./User-routes')

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
