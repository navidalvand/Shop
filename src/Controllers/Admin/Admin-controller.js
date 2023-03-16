const { ResponseHandler } = require("../../Utils/Response-Handler");
const { ModelHandler } = require("../../Utils/Model-Handler");
const { hashPass } = require("../../Utils/hashPass");
const { UserModel } = require("../../models/User_model");

class AdminController {
  async createUser(req, res, next) {
    try {
      const { username, phoneNumber, email, password } = req.body;
      if (!username || !phoneNumber || !email || !password)
        throw { status: 400, message: "some fields are empty" };
      const existUser = await ModelHandler.isItExist(UserModel, [
        { username },
        { phoneNumber },
        { email },
      ]);
      if (existUser) throw { message: "duplicate error", status: 400 };
      const response = new ResponseHandler(res);
      const user = await UserModel.create({
        username,
        phoneNumber,
        email,
        password: hashPass(password),
      });
      response.created({
        status: 201,
        message: "user created",
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
      const update = await UserModel.updateOne(
        { _id: userID },
        { $set: { username, firstName, lastName } }
      );

      if (update.acknowledged == 0)
        throw { status: 400, message: "cannot update" };

      const user = await ModelHandler.getByID(UserModel, userID);
      if (!user) throw { status: 404, message: "user not found" };
      const response = new ResponseHandler(res);
      response.success({
        status: 200,
        message: "updated",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserByID(req, res, next) {
    try {
      const userID = req.params.id;
      const user = await UserModel.findById(userID);
      if (!user) throw { status: 404, message: "user not found" };
      const response = new ResponseHandler(res);
      response.success({
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
      const users = await ModelHandler.get(UserModel, query);
      if (!users) throw { status: 404, message: "user not found" };
      const response = new ResponseHandler(res);
      response.success({
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userID = req.params.id;
      const user = await ModelHandler.getByID(UserModel, userID);
      console.log(user);
      if (!user) throw { status: 404, message: "user not found" };
      const deleteUser = await ModelHandler.delete(UserModel, { _id: userID });
      if (!deleteUser.acknowledged)
        throw { status: 400, message: "cannot delete user" };
      const response = new ResponseHandler(res);
      response.success({
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
      if (role != "ADMIN" && role != "OWNER" && role != "USER")
        throw { status: 400, message: `role (${role}) is not defined` };
      const user = await ModelHandler.getByID(UserModel, userID);
      if (!user) throw { status: 404, message: "user not found" };
      user.role = role;
      const response = new ResponseHandler(res);
      response.success({
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

  async getProductsList(req, res, next) {
    try {
      const query = req.query
      console.log(query);
      
    } catch (err) {
      next(err);
    }
  }

  async getProductByID(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async acceptProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async rejectProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async createProduct(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async createCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async updateCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getCategoriesList(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async createComment(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getCommentsList(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async createSlider(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async updateSlider(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteSlider(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getSlidersList(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  AdminController: new AdminController(),
};
