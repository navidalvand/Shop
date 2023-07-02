class Controller {
  test(res, message) {
    console.log("object");
    this.res.status(200).json({ message });
  }

  setCookie(res, { cookieName, cookieValue, options = {} }) {
    res.cookie(cookieName, cookieValue, options);
  }

  clearCookie(res, { cookieName }) {
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
