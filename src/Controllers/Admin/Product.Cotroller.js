const { validationResult } = require("express-validator");
const { Controller } = require("../Controller");
const { ModelHandler } = require("../../Utils/Model-Handler");
const { ProductModel } = require("../../models/Product_model");
const { CategoryModel } = require("../../models/Category_model");

class ProductAdminController extends Controller {
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
       *?      Data ]
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
        images,
      });
      //?                             Send Created Product Response
      if (!product) throw { status: 400, message: "cannot create product" };
      super.created(res ,{ data: product });
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
      super.success(res ,{
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
      super.success({
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }

  async acceptProduct(req, res, next) {
    try {
      const productID = req.params.id;

      const product = await ModelHandler.getByID(ProductModel, productID);

      if (!product) throw { status: 404, message: "product not found" };

      if (product.status === "accepted")
        throw { status: 400, message: "the product already accepted" };

      product.status = "accepted";
      product.save();

      super.success({ data: product, message: "accepted" });
    } catch (err) {
      next(err);
    }
  }

  async rejectProduct(req, res, next) {
    try {
      const productID = req.params.id;

      const product = await ModelHandler.getByID(ProductModel, productID);

      if (!product) throw { status: 404, message: "product not found" };

      if (product.status === "rejected")
        throw { status: 400, message: "the product already rejected" };

      product.status = "rejected";
      product.save();

      super.success({ data: product, message: "rejected" });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const productID = req.params.id;

      const product = await ModelHandler.delete(ProductModel, {
        _id: productID,
      });

      if (!product.deletedCount)
        throw { status: 404, message: "the product not found" };

      super.success({ data: product, message: "deleted" });
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const productID = req.params.id;

      const product = await ModelHandler.getByID(ProductModel, productID);

      if (!product) throw { status: 404, message: "the product not found" };

      const {
        title,
        description,
        category,
        type,
        city,
        address,
        price,
        contact,
      } = req.body;

      let images = req.files.map((e) => {
        if (e.fieldname == "images") return `uploads/${e.filename}`;
      });

      if (images.length == 0) images = undefined;

      if (category) {
        const checkCategory = await ModelHandler.getOne(CategoryModel, {
          title: category,
        });
        if (!checkCategory)
          throw { status: 400, message: `category "${category}" not found` };
      }

      const updateProduct = await ModelHandler.updateOne(
        ProductModel,
        { _id: productID },
        {
          title,
          description,
          category,
          type,
          city,
          address,
          price,
          contact,
          images,
        }
      );

      const result = await ModelHandler.getByID(ProductModel, productID);

      super.success({ data: result, message: "updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  ProductAdminController: new ProductAdminController(),
};
