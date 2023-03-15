function isItExist(DBName, params) {
  return DBName.findOne({ $or: params });
}

module.exports = {
  isItExist,
};
