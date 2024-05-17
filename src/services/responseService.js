class Response {
  static successCode = 200;

  static failCode = 500;

  static notFoundCode = 404;

  static badRequestCode = 400;

  static unauthorizedCode = 401;

  static forbiddenCode = 403;

  static dataTable(object) {
    const { data, message = 'Data retrieved successfully' } = object;
    const response = {
      status: 'success',
      data,
      message,
    };
    return response;
  }

  static success(message = 'Process was successfull') {
    const response = {
      status: 'success',
      message,
    };
    return response;
  }

  static fail(message = 'Error processing your request') {
    const response = {
      status: 'fail',
      message,
    };
    return response;
  }

  // static file() {}
}

module.exports = Response;
