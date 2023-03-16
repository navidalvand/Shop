const app = require('express').Router()
const {APIsRouter} = require('./API-routes/API-routes');
const {adminsRouter} = require('./Admin/Admin-routes');
const {pagesRouter} = require('./Pages/Page-routes');
const { authRoutes } = require('./Auth/Auth-routes');
const { autoLogin } = require('../middlewares/auto_login');
const { checkAdminRole } = require('../middlewares/admin_role');



app.use("/auth" , authRoutes)
app.use("/api" , autoLogin , APIsRouter)
app.use("/admin" , autoLogin , checkAdminRole , adminsRouter)
app.use("/pages" , pagesRouter)




module.exports = {
    mainRoutes : app
}
