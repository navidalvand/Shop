const { UserModel } = require("../models/User_model");
const { verifyToken } = require("../Utils/token");
const { ModelHandler } = require("../Utils/Model-Handler");

const autoLogin = async (req, res, next) => {
  //?                             Check If Token Doesn't Exist Send ("please login to your account")
  const token = req.cookies.token;
  if (!token)
    return next({ status: 401, message: "please login to your account" });

    //?                          Verify Token Result = {username , roel}
  const result = verifyToken(token);

  //?                            Get User By Username
  const user = await ModelHandler.getOne(UserModel , {username : result.username})
  if (!user) return next({ status: 404, message: "user not fond" });
  req.user = user;
  next();
};

module.exports = {
  autoLogin,
};
