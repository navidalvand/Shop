const { ResponseHandler } = require("../../Utils/Response-Handler");
const { isItExist } = require("../../Utils/existDocument");
const { hashPass } = require("../../Utils/hashPass");
const { UserModel } = require("../../models/User_model");

class AdminController {
  async createUser(req, res, next) {
    try {
      const response = new ResponseHandler(res);
      const { username, phoneNumber, email, password } = req.body;
      if (!username || !phoneNumber || !email || !password)
        throw { status: 400, message: "some fields are empty" };
      const existUser = await isItExist(UserModel, [
        { username },
        { phoneNumber },
        { email },
      ]);
      if (existUser) throw { message: "duplicate error", status: 400 };
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
      const response = new ResponseHandler(res);
      const userID = req.params.id;
      const { username, firstName, lastName } = req.body;
      const update = await UserModel.updateOne(
        { _id: userID },
        { $set: { username, firstName, lastName } }
      );

        const user = await UserModel.findById(userID)
        response.success({
          status : 200,
          message : "updated",
          data : user
        })

    } catch (err) {
      next(err);
    }
  }

  async getUserByUserName(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getUsersList(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async changeUserRole(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async getProductsList(req, res, next) {
    try {
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
