class Controller {
  test(res, value) {
    res.send({ value });
  }

  setCookie(res, { cookieName, cookieValue, options = {} }) {
    res.cookie(cookieName, cookieValue, options);
  }

  clearCookie(res, cookieName) {
    res.clearCookie(cookieName);
  }

  success(res, { status = 200, message = "OK", data = null }) {
    res.status(200).json({
      status,
      message,
      data,
    });
  }

  created(res, { status = 201, message = "Created", data = null }) {
    res.status(201).json({
      status,
      message,
      data,
    });
  }
}


module.exports = {
  Controller,
};
