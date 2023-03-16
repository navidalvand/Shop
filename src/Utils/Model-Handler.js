class ModelHandler {
  isItExist(DBName, params) {
    return DBName.findOne({ $or: params });
  }

  get(DBName, options) {
    return DBName.find(options)
  }

  getByID (DBName , ID) {
    return DBName.findById(ID)
  }

  delete(DBName , filter) {
    return DBName.deleteOne(filter)
  }
}




module.exports = {
  ModelHandler : new ModelHandler(),
};
