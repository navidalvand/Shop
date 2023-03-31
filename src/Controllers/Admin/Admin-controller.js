const { ResponseHandler } = require("../../Utils/Response-Handler");
const { ModelHandler } = require("../../Utils/Model-Handler");
const { hashPass } = require("../../Utils/hashPass");
const { UserModel } = require("../../models/User_model");
const { ProductModel } = require("../../models/Product_model");
const { validationResult, check } = require("express-validator");
const { CategoryModel } = require("../../models/Category_model");

class AdminController {
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
      const response = new ResponseHandler(res);
      const user = await UserModel.create({
        username,
        phoneNumber,
        email,
        password: hashPass(password),
      });
      response.created({
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
      const update = await UserModel.updateOne(
        { _id: userID },
        { $set: { username, firstName, lastName } }
      );

      //?                            Check If Updated Or Not
      if (update.acknowledged == 0)
        throw { status: 400, message: "user not found" };

      //?                          Get New User's Data And Send Response
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

      //?                               Get User By ID
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

      //?                               Get Users By Query
      const users = await ModelHandler.get(UserModel, query);
      if (users.length == 0) throw { status: 404, message: "user not found" };
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

      //?                                  Check If User Exist
      const user = await ModelHandler.getByID(UserModel, userID);
      if (!user) throw { status: 404, message: "user not found" };

      //?                                  Delete User And Send Response
      const deleteUser = await ModelHandler.delete(UserModel, { _id: userID });
      if (!deleteUser.acknowledged)
        throw { status: 400, message: "cannot delete user" };
      const response = new ResponseHandler(res);
      //?                                  Send The Deleted User Response
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
      //?                          Check If Role Is Real Or Not
      if (role != "ADMIN" && role != "OWNER" && role != "USER")
        throw { status: 400, message: `role (${role}) is not defined` };

      //?                        Check If User Exist Or Not
      const user = await ModelHandler.getByID(UserModel, userID);
      if (!user) throw { status: 404, message: "user not found" };

      //?                          Update To New Role
      user.role = role;
      const response = new ResponseHandler(res);

      //?                          Send The User With New Role Response
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

  async createProduct(req, res, next) {
    try {
      const result = validationResult(req);
      /**
       *?    Validating [
       *?      title,
       *?      description,
       *?      category,
       *?      type,
       *?      city,
       *?      address,
       *?      price,
       *?      contact,
       *?      status,
       *?     ] Data
       */
      if (result.errors.length > 0)
        throw {
          status: 400,
          message: result.errors,
        };
      const {
        title,
        description,
        category,
        type,
        city,
        address,
        price,
        contact,
        status,
      } = req.body;

      //?                     Returns Files that Has The "images" Field Name
      let images = req.files.map((e) => {
        if (e.fieldname == "images") return `uploads/${e.filename}`;
      });

      //?                      If Files Are Empty Product Images Will Be The Default Image
      if (images.length == 0) images = undefined;

      //?                      Check If Category Is Real
      const checkCategory = await ModelHandler.getOne(CategoryModel, {
        title: category,
      });
      if (!checkCategory)
        throw { status: 400, message: `category "${category}" not found` };

      //?                           Creating Product
      const userID = req.user._id;
      const product = await ModelHandler.create(ProductModel, {
        owner: userID,
        title,
        description,
        category: checkCategory._id,
        type,
        city,
        address,
        price,
        contact,
        status,
        images,
      });
      //?                             Send Created Product Response
      if (!product) throw { status: 400, message: "cannot create product" };
      const response = new ResponseHandler(res);
      response.created({ data: product });
    } catch (err) {
      next(err);
    }
  }

  async getProductsList(req, res, next) {
    try {
      const query = req.query;
      //?                              Get Products By Query
      const products = await ModelHandler.get(ProductModel, query);
      if (products.length == 0)
        throw { status: 404, message: "product not found" };
      const response = new ResponseHandler(res);
      response.success({
        data: products,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProductByID(req, res, next) {
    try {
      const productID = req.params.id;
      //?                                Getting Product By ID
      const product = await ModelHandler.getByID(ProductModel, productID);
      if (!product) throw { status: 404, message: "product not found" };
      const response = new ResponseHandler(res);
      response.success({
        data: product,
      });
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
