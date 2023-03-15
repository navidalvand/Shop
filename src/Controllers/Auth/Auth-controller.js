const { UserModel } = require("../../models/User_model");
const { isItExist } = require("../../Utils/existDocument");
const { validationResult } = require("express-validator");
const { hashPass, comparePass } = require("../../Utils/hashPass");
const { generateToken } = require("../../Utils/token");
const { ResponseHandler } = require("../../Utils/Response-Handler");

class AuthController {
  async singUp(req, res, next) {
    try {
      const response = new ResponseHandler(res);
      const result = validationResult(req);
      if (result.errors.length > 0)
        throw {
          status: 400,
          message: result.errors,
        };

      const {
        username,
        phoneNumber,
        email,
        password,
        role = "user",
      } = req.body;
      let exist = await isItExist(UserModel, [
        { username },
        { phoneNumber },
        { email },
      ]);

      if (exist)
        throw {
          status: 400,
          message: "duplicate error",
        };

      let user = await UserModel.create({
        username,
        phoneNumber,
        password: hashPass(password),
        email,
      });

      const token = generateToken({ username, role });

      response.setCookie("token", token, { maxAge: 86400000, httpOnly: true });
      response.created({
        status: 201,
        message: "created",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async logIn(req, res, next) {
    try {
      const response = new ResponseHandler(res);
      const result = validationResult(req);
      if (result.errors.length > 0)
        throw { status: 400, message: result.errors };
      const { username, password } = req.body;
      const isLogin = req?.cookies?.token;
      if (isLogin) throw { status: 400, message: "you are login already" };

      const user = await isItExist(UserModel, [{ username }]);
      if (!user)
        throw { status: 404, message: "username or password is wrong" };

      const compare = comparePass(password, user.password);

      if (!compare)
        throw { status: 404, message: "username or password is wrong" };

      const token = generateToken({ username, role: user.role });
      response.setCookie("token", token, { maxAge: 86400000, httpOnly: true });
      response.success({ status: 200, message: "you loged in" });
    } catch (err) {
      next(err);
    }
  }

  async logOut(req, res, next) {
    const response = new ResponseHandler(res);

    response.clearCookie("token");
    response.success({ message: "you loged out" });
  }
}

module.exports = { AuthController: new AuthController() };
