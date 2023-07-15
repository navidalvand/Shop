const { UserModel } = require("../../models/User_model");
const { ModelHandler } = require("../../Utils/Model-Handler");
const { validationResult } = require("express-validator");
const { hashPass, comparePass } = require("../../Utils/hashPass");
const { generateToken } = require("../../Utils/token");
const { ValidResponseAcions } = require("../../Utils/Response.ValidActions");

class AuthController {
  async singUp(req, res, next) {
    try {
      const result = validationResult(req);

      //?                           Validating RequestBody Data [ username, phoneNumber, email, password ]
      if (result.errors.length > 0)
        throw {
          action: ValidResponseAcions.BADREQUEST,
          statusCode: 400,
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
          action: ValidResponseAcions.BADREQUEST,
          statusCode: 400,
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
      next({
        action: ValidResponseAcions.SETCOOKIE,
        dataObj: {
          data: user,
          message: "you loged in",
          options: {
            cookieName: "token",
            cookieValue: token,
            cookieOptions: { maxAge: 86400000, httpOnly: true },
          },
        },
      });
    } catch (err) {
      next({
        action: err.action || ValidResponseAcions.ERROR,
        dataObj: {
          message: err.message,
          statusCode: err.statusCode,
          data: err.data,
        },
      });
    }
  }

  async logIn(req, res, next) {
    try {
      const result = validationResult(req);

      //?                             Validating Request Body Data [ username, password ]
      if (result.errors.length > 0)
        throw {
          statusCode: 400,
          action: ValidResponseAcions.BADREQUEST,
          message: result.errors,
        };
      const { username, password } = req.body;

      //?                             Check If User Exist In DB
      const user = await ModelHandler.getOne(UserModel, { username });
      if (!user)
        throw {
          statusCode: 401,
          action: ValidResponseAcions.UNAUTHORIZED,
          message: "username or password is wrong",
        };

      //?                            Check Password In DB
      const compare = comparePass(password, user.password);
      if (!compare)
        throw {
          statusCode: 401,
          action: ValidResponseAcions.UNAUTHORIZED,
          message: "username or password is wrong",
        };

      //?                            Generate And Set New Token In Cookie
      const token = generateToken({ username, role: user.role });

      next({
        action: ValidResponseAcions.SETCOOKIE,
        dataObj: {
          message: "you loged in",
          options: {
            cookieName: "token",
            cookieValue: token,
            cookieOptions: { maxAge: 86400000, httpOnly: true },
          },
        },
      });
    } catch (err) {
      next({
        action: `${err.action || ValidResponseAcions.ERROR}`,
        dataObj: {
          message: err.message,
          statusCode: err.statusCode,
          data: err.data,
        },
      });
    }
  }

  async logOut(req, res, next) {
    try {
      //?                             Clear The Cookie And Send Response
      next({
        action: ValidResponseAcions.CLEARCOOKIE,
        dataObj: { data: { cookieName: "token" } },
      });
    } catch (err) {
      next({
        action: err.action || ValidResponseAcions.ERROR,
        dataObj: {
          message: err.message,
          statusCode: err.statusCode,
          data: err.data,
        },
      });
    }
  }
}

module.exports = { AuthController: new AuthController() };
