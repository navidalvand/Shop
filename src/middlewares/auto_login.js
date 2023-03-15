const { UserModel } = require("../models/User_model");
const { verifyToken } = require("../Utils/token");
const { isItExist } = require("../Utils/existDocument");

const checkLogin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return next({ status: 400, message: "please login to your account" });
  const result = verifyToken(token);
  const user = await isItExist(UserModel , [{username : result.username}])
  if (!user) return next({ status: 404, message: "user not fond" });
  req.user = user;
  next();
};

module.exports = {
  checkLogin,
};
