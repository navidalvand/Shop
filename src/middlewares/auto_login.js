const { UserModel } = require("../models/User_model");
const { verifyToken } = require("../Utils/token");
const { ModelHandler } = require("../Utils/Model-Handler");
const { ValidResponseAcions } = require("../Utils/Response.ValidActions");

const autoLogin = async (req, res, next) => {
  try {
    //?                             Check If Token Doesn't Exist Send ("please login to your account")
    const token = req.cookies.token;
    console.log(token);
    if (!token)
      throw {
        action: ValidResponseAcions.UNAUTHORIZED,
        message: "please login to your account first",
      };

    //?                          Verify Token Result = {username , roel}
    const result = verifyToken(token);

    //?                            Get User By Username
    const user = await ModelHandler.getOne(UserModel, {
      username: result.username,
    });
    if (!user)
      throw {
        action: ValidResponseAcions.NOTFOUND,
        message: "user not fond",
      };
    req.user = user;
    next();
  } catch (err) {
    return next({
      action: err.action || ValidResponseAcions.ERROR,
      dataObj: {
        message: err.message,
        statusCode: err.statusCode,
        data: err.data,
      },
    });
  }
};

module.exports = {
  autoLogin,
};
