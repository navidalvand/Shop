const checkAdminRole = async (req, res, next) => {
  try {
    const user = req.user;
    //?                Check If Users (Role === USER) Then => ("you dont have access to this page")
    if (user.role == "USER")
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
  checkAdminRole,
};
