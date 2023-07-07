class Controller {
  test(res, message) {
    res.status(200).json({ message });
  }

  setCookie(res, { cookieName, cookieValue, options = {} }) {
    if (!cookieName || !cookieValue)
      throw { status: 500, message: "cookieName or cookieValue is empty" };
    res.cookie(cookieName, cookieValue, options);
  }

  clearCookie(res, { cookieName }) {
    if (!cookieName) throw { status: 500, message: "cookieName is empty" };
    res.clearCookie(cookieName);
  }

  success(res, { status = 200, message = "OK", data = null }) {
    res.status(200).json({
      status,
      message,
      data,
    });
  }

  created(res, { data = null, message = "Created", status = 201 }) {
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
