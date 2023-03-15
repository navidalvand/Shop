class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  test(value) {
    this.res.send(value);
  }

  setCookie(cookieName, cookieValue, options = {}) {
    this.res.cookie(cookieName, cookieValue, options);
  }

  clearCookie(cookieName) {
    this.res.clearCookie(cookieName);
  }

  success(data) {
    this.res.status(200).json({
      status: data?.status || 200,
      message: data?.message || "Success",
      data: data?.data || null,
    });
  }

  created(data) {
    this.res.status(201).json({
      status: data?.status || 201,
      message: data?.message || "Created",
      data: data?.data || null,
    });
  }
}

module.exports = {
  ResponseHandler,
};
