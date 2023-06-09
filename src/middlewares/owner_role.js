const checkOwnerRole = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role == "USER" || user.role == "ADMIN")
      throw {
        status: 400,
        message: "you dont have access to this page",
      };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkOwnerRole,
};
