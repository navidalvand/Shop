const { UserModel } = require("../models/User_model");
const { verifyToken } = require("../modules/token");
const { isItExist } = require("../modules/existDocument");

const adminLogin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return next({ status: 400, message: "please login to your account" });
  const result = verifyToken(token);
  const user = await isItExist(UserModel, [{ username: result.username }]);
  if (!user) return next({ status: 404, message: "user not fond" });
  if (user.role != "admin")
    return next({
      status: 400,
      message: "you dont have access to panel admin",
    });
  req.user = user;
  next();
};

module.exports = {
  adminLogin,
};
