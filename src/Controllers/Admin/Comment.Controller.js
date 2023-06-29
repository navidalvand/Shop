const { ModelHandler } = require("../../Utils/Model-Handler");
const { CommentModel } = require("../../models/Comment_model");
const { Controller } = require("../Controller");

class CommentAdminController extends Controller {
  async createComment(req, res, next) {
    try {
      const productID = req.params.id;
      const userID = req.user._id;
      const { text } = req.body;
      if (!text.trim()) throw { status: 400, message: "text cannot be empty" };

      const findProduct = await ModelHandler.getByID(ProductModel, productID);
      if (!findProduct) throw { status: 404, message: "product not found" };
      const createComment = await ModelHandler.create(CommentModel, {
        author: userID,
        text: text.trim(),
        product: productID,
      });

      this.success({
        data: createComment,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const commentID = req.params.id;

      const deleteComment = await ModelHandler.delete(CommentModel, {
        _id: commentID,
      });

      if (deleteComment.deletedCount === 0)
        throw { status: 404, message: "comment not found" };

      this.success({ data: deleteComment });
    } catch (err) {
      next(err);
    }
  }

  async getCommentsList(req, res, next) {
    try {
      const query = req.query;
      const findComments = await ModelHandler.get(CommentModel, query);
      if (findComments.length === 0)
        throw { status: 404, message: "comment not found" };
      this.success({ data: findComments });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  CommentAdminController: new CommentAdminController(),
};
