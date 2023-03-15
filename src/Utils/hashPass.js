const bcrypt = require('bcrypt');

function hashPass (str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
  }

function comparePass (usersPass , DBPass) {
  return bcrypt.compareSync(usersPass , DBPass)
}


module.exports = {
    hashPass,
    comparePass
}
