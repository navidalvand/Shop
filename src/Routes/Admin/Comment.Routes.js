const { CommentAdminController } = require("../../Controllers/Admin/Comment.Controller");

const router = require("express").Router();



//!                                                       Create Comment Under Product In Panel Admin "Route"
router.post("/create/:id", CommentAdminController.createComment);


//!                                                       Delete Comment Under Product By ID In Panel Admin "Route"
router.delete("/delete/:id", CommentAdminController.deleteComment);


//!                                                       Get All Comments In Panel Admin "Route"
router.get("/all", CommentAdminController.getCommentsList);


module.exports = {
  CommentRoutes: router,
};
