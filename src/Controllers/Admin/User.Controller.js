const { validationResult } = require("express-validator");
const { Controller } = require("../Controller");
const { ModelHandler } = require("../../Utils/Model-Handler");
const { hashPass } = require("../../Utils/hashPass");
const { UserModel } = require("../../models/User_model");

class UserAdminController extends Controller {
  async createUser(req, res, next) {
    try {
      const result = validationResult(req);
      //?                Validating RequestBody Data [ username, phoneNumber, email, password ]
      if (result.errors.length > 0)
        throw {
          status: 400,
          message: result.errors,
        };
      const { username, phoneNumber, email, password } = req.body;

      //?                  Check If One Of [ username, phoneNumber, email ] Are Exist
      const existUser = await ModelHandler.isItExist(UserModel, [
        { username },
        { phoneNumber },
        { email },
      ]);
      if (existUser) throw { message: "duplicate error", status: 400 };

      //?                   Create User And Send Response
      const user = await UserModel.create({
        username,
        phoneNumber,
        email,
        password: hashPass(password),
      });
      super.created(res, {
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const userID = req.params.id;
      const { username, firstName, lastName } = req.body;
      //?                                 Update [username firstName lastName]
      const update = await ModelHandler.updateOne(
        UserModel,
        { _id: userID },
        { username, firstName, lastName }
      );

      //?                            Check If Updated Or Not
      if (update.matchedCount == 0)
        throw { status: 400, message: "user not found" };

      super.success(res, {
        status: 200,
        message: "updated",
        data: update,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserByID(req, res, next) {
    try {
      const userID = req.params.id;

      //?                               Get User By ID
      const user = await UserModel.findById(userID);
      if (!user) throw { status: 404, message: "user not found" };
      super.success(res, {
        message: "user",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUsersList(req, res, next) {
    try {
      const query = req.query;
      console.log(query);
      //?                               Get Users By Query
      const users = await ModelHandler.get(UserModel, query);
      if (users.length == 0) throw { status: 404, message: "user not found" };
      super.success(res, {
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userID = req.params.id;

      //?                                  Check If User Exist
      const user = await ModelHandler.getByID(UserModel, userID);
      if (!user) throw { status: 404, message: "user not found" };

      //?                                  Delete User And Send Response
      const deleteUser = await ModelHandler.delete(UserModel, { _id: userID });
      if (!deleteUser.acknowledged)
        throw { status: 400, message: "cannot delete user" };
      //?                                  Send The Deleted User Response
      super.success(res, {
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async changeUserRole(req, res, next) {
    try {
      const userID = req.params.id;
      const { role } = req.body;
      //?                          Check If Role Is Real Or Not
      if (role != "ADMIN" && role != "OWNER" && role != "USER")
        throw { status: 400, message: `role (${role}) is not defined` };

      //?                        Check If User Exist Or Not
      const user = await ModelHandler.getByID(UserModel, userID);
      if (!user) throw { status: 404, message: "user not found" };

      //?                          Update To New Role
      user.role = role;
      user.save();

      //?                          Send The User With New Role Response
      super.success(res, {
        message: "role updated",
        data: {
          user,
          newRole: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  UserAdminController: new UserAdminController(),
};
