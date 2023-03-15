const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "24h",
  });
}

function verifyToken(token) {
  const result = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

  if (!result.username) throw { status: 400, message: "token not found" };

  return result;
}

module.exports = {
  generateToken,
  verifyToken
};
