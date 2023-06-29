const { Controller } = require("../Controller");

class CategoryAdminController extends Controller {
    


    async createCategory(req, res, next) {
        try {
          const { title } = req.body;
          if (!title.trim())
            throw { status: 400, message: "title cannot be empty" };
          const category = await ModelHandler.create(CategoryModel, {
            title: title.trim(),
          });
          const response = new ResponseHandler(res);
          response.created({ data: category });
        } catch (err) {
          next(err);
        }
      }
    


      async deleteCategory(req, res, next) {
        try {
          const ID = req.params.id;
          const findCategory = await ModelHandler.delete(CategoryModel, {
            _id: ID,
          });
          if (findCategory.deletedCount === 0)
            throw { status: 404, message: "category not found" };
          const response = new ResponseHandler(res);
          response.success({ data: findCategory });
        } catch (err) {
          next(err);
        }
      }
    

      async updateCategory(req, res, next) {
        try {
          const ID = req.params.id;
          const { title } = req.body;
          if (!title?.trim())
            throw { status: 400, message: "title is not a valid title" };
          const updateCategory = await ModelHandler.updateOne(
            CategoryModel,
            { _id: ID },
            { title: title.trim() }
          );
    
          if (updateCategory.modifiedCount === 0)
            throw { status: 400, message: "cannot update the category title" };
    
          const reponse = new ResponseHandler(res);
          reponse.success({ data: updateCategory });
        } catch (err) {
          next(err);
        }
      }



      async getCategoriesList(req, res, next) {
        try {
          const query = req.query;
          const findCategory = await ModelHandler.get(CategoryModel, query);
          if (findCategory.length === 0)
            throw { status: 404, message: "category not found" };
          const response = new ResponseHandler(res);
          response.success({ data: findCategory });
        } catch (err) {
          next(err);
        }
      }
    




















    
}


module.exports = {
    CategoryAdminController : new CategoryAdminController()
}
