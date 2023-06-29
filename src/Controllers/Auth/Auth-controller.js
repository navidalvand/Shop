const { UserModel } = require("../../models/User_model");
const { ModelHandler } = require("../../Utils/Model-Handler");
const { validationResult } = require("express-validator");
const { hashPass, comparePass } = require("../../Utils/hashPass");
const { generateToken } = require("../../Utils/token");
const { Controller } = require("../Controller");

class AuthController extends Controller {
  async singUp(req, res, next) {
    try {
      this.test("test message")
      const result = validationResult(req);

      //?                           Validating RequestBody Data [ username, phoneNumber, email, password ]
      if (result.errors.length > 0)
        throw {
          status: 400,
          message: result.errors,
        };

      const { username, phoneNumber, email, password } = req.body;

      //?                          Check If [ username, phoneNumber, email ] Are Already Exist
      let exist = await ModelHandler.isItExist(UserModel, [
        { username },
        { phoneNumber },
        { email },
      ]);

      if (exist)
        throw {
          status: 400,
          message: "duplicate error",
        };

      //?                        Create User And Hashed Password
      let user = await UserModel.create({
        username,
        phoneNumber,
        password: hashPass(password),
        email,
      });

      //?                           Generate Token By Username & Role
      const token = generateToken({ username, role: "USER" });

      //?                           Set Token In Cookies (ExpiresIn 24H later)
      this.setCookie("token", token, { maxAge: 86400000, httpOnly: true });

      this.created({
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async logIn(req, res, next) {
    try {
      const result = validationResult(req);

      //?                             Validating Request Body Data [ username, password ]
      if (result.errors.length > 0)
        throw { status: 400, message: result.errors };
      const { username, password } = req.body;

      //?                             Check If User Exist In DB
      const user = await ModelHandler.getOne(UserModel, { username });
      if (!user)
        throw { status: 404, message: "username or password is wrong" };

      //?                            Check Password In DB
      const compare = comparePass(password, user.password);
      if (!compare)
        throw { status: 404, message: "username or password is wrong" };

      //?                            Generate And Set New Token In Cookie
      const token = generateToken({ username, role: user.role });
      this.setCookie("token", token, { maxAge: 86400000, httpOnly: true });
      this.success({ status: 200, message: "you loged in" });
    } catch (err) {
      next(err);
    }
  }

  async logOut(req, res, next) {
    //?                             Clear The Cookie And Send Response
    this.clearCookie("token");
    this.success({ message: "you loged out" });
  }
}

module.exports = { AuthController: new AuthController() };
