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

 
  create(DBName , fields) {
    return DBName.create(fields)
  }

  getOne(DBName , options) {
    return DBName.findOne(options)
  }
}




module.exports = {
  ModelHandler : new ModelHandler(),
};
