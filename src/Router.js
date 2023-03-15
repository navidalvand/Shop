const app = require('express').Router()
const {APIsRouter} = require('./Routes/API-routes/API-routes');
const {adminsRouter} = require('./Routes/Admin-routes');
const {pagesRouter} = require('./Routes/Page-routes');
const { authRoutes } = require('./Routes/Auth-routes');
const { checkLogin } = require('./middlewares/auto_login');



app.use("/auth" , authRoutes)
app.use("/api" , checkLogin , APIsRouter)
app.use("/admin" , adminsRouter)
app.use("/pages" , pagesRouter)





module.exports = {
    mainRoutes : app
}
