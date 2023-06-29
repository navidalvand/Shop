class Controller {
  constructor(req, res) {
    this.res = res;
    this.req = req;
  }

  //!                         Send A Test Response
  test(value) {
    this.res.send(value);
  }

  //!                         Set Cookie
  setCookie(cookieName, cookieValue, options = {}) {
    this.res.cookie(cookieName, cookieValue, options);
  }

  //!                         Clear Cookie
  clearCookie(cookieName) {
    this.res.clearCookie(cookieName);
  }

  //!                         Send A Success Response
  success(data) {
    this.res.status(200).json({
      status: data?.status || 200,
      message: data?.message || "OK",
      data: data?.data || null,
    });
  }

  //!                         Send A Created Data Response
  created(data) {
    this.res.status(201).json({
      status: data?.status || 201,
      message: data?.message || "Created",
      data: data?.data || null,
    });
  }
}

function setController(req, res) {
  new Controller(req, res);
}

module.exports = {
  Controller,
  setController,
};