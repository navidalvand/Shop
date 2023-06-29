const { validationResult } = require("express-validator");
const { Controller } = require("../Controller");
const { ModelHandler } = require("../../Utils/Model-Handler");
const { SliderModel } = require("../../models/Slider_model");

class SliderAdminController extends Controller {
  async createSlider(req, res, next) {
    try {
      const result = validationResult(req);
      if (result.errors.length > 0)
        throw {
          status: 400,
          message: result.errors,
        };
      const { title, type } = req.body;
      const validTypes = ["Footer", "Main", "Header"];
      if (!validTypes.includes(type))
        throw { status: 400, message: `type "${type}" is not a valid type` };

      let image = req.file;
      if (!image) throw { status: 400, message: "image cannot be empty" };
      image = `/uploads/${image.filename}`;
      console.log(image);

      const createSlider = await ModelHandler.create(SliderModel, {
        title,
        type,
        image,
      });

      this.created({ data: createSlider });
    } catch (err) {
      next(err);
    }
  }

  async deleteSlider(req, res, next) {
    try {
      const sliderID = req.params.id;

      const deleteSlider = await ModelHandler.delete(SliderModel, {
        _id: sliderID,
      });
      if (deleteSlider.deletedCount === 0)
        throw { status: 400, message: `slider with "${sliderID}" not found` };
      this.success({ data: deleteSlider });
    } catch (err) {
      next(err);
    }
  }

  async updateSlider(req, res, next) {
    try {
      const id = req.params.id;

      const checkExist = await ModelHandler.getByID(SliderModel, id);

      if (!checkExist) throw { status: 404, message: "slider not found" };
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
  SliderAdminController: new SliderAdminController(),
};
