const { UserModel } = require("../../models/User_model");
const { isItExist } = require("../../Utils/existDocument");
const { validationResult } = require("express-validator");
const { hashPass, comparePass } = require("../../Utils/hashPass");
const { generateToken } = require("../../Utils/token");
const { ResponseHandler } = require("../Response-Handler");

class AuthController {
  async singUp(req, res, next) {
    try {
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

      res
        .cookie("token", token, { maxAge: 86400000, httpOnly: true })
        .status(201)
        .json({
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
      res
        .cookie("token", token, { maxAge: 86400000, httpOnly: true })
        .status(200)
        .json({ status: 200, message: "you loged in" });
    } catch (err) {
      next(err);
    }
  }

  async logOut(req, res, next) {
    res.clearCookie("token").status(200).json({
      status: 200,
      message: "you loged out",
      data: req.user,
    });
  }


  async test() {
    try {
      
    } catch (err) {
      next(err)
    }
  }


}

module.exports = { AuthController: new AuthController() };
