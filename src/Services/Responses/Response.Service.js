class ResponseHandler {
  #res;
  run(
    { action, data: { statusCode, message, data, options } },
    req,
    resObj,
    next
  ) {
    this.#res = resObj;
    switch (action) {
      case "CREATED":
        this.#create({ data, message, statusCode });
        break;

      case "SETCOOCKIE":
        this.#setCoockie({ message, statusCode, data, options });
        break;

      case "SUCCESS":
        this.#success({ data, message, statusCode });
        break;

      case "UNAUTHORIZED":
        this.#unAuthorized({ statusCode, message, data });
        break;

      case "NOTFOUND":
        this.#notFound({ statusCode, message, data });
        break;

      case "ACCEPTED":
        this.#accepted({ statusCode, message, data });
        break;

      case "FORBIDDEN":
        this.#forbidden({ data, message, statusCode });
        break;

      case "BADREQUEST":
        this.#badRequest({ data, message, statusCode });
        break;

      case "ERROR":
        this.#error({ data, message, statusCode });
        break;
      default:
        console.log(
          new Error(
            `The Given Action Is Not A Valid Action. Given Action: (${action})`
          )
        );
        break;
    }
  }

  #create({ statusCode = 201, message = "Created", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  #success({ statusCode = 200, message = "OK", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  #setCoockie({
    statusCode = 200,
    message = "OK",
    data = null,
    options: { cookieName = "", cookieValue = "", coockieOptions = {} } = {},
  }) {
    this.#res
      .status(statusCode)
      .cookie(cookieName, cookieValue, coockieOptions)
      .json({
        statusCode,
        message,
        data,
      });
  }

  #unAuthorized({ statusCode = 401, message = "Unauthorized", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  #notFound({ statusCode = 404, message = "Not Found", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  #accepted({ statusCode = 202, message = "Accepted", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  #forbidden({ statusCode = 403, message = "Forbidden", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  #badRequest({ statusCode = 400, message = "Bad Reques", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }

  #error({ statusCode = 500, message = "Internal Server Error", data = null }) {
    this.#res.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }
}

module.exports = {
  ResponseHandler: new ResponseHandler(),
};
