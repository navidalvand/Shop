const { commentRoutes } = require('./Comment-routes')
const { productRoutes } = require('./Product-routes')
const { userRoutes } = require('./User-routes')

const app = require('express').Router()



app.use("/user" , userRoutes)
app.use("/product" , productRoutes)
app.use("/comment" , commentRoutes)












module.exports = {
    APIsRouter : app
}
