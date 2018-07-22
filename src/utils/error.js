class APIError extends Error {
  constructor({
    message, status = 500, stack, errors
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.stack = stack;
    this.errors = errors;
  }
}

const checkDuplicateEmail = (error) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return new APIError({ message: 'Email already exists', status: 409 });
  }

  return error;
};

export {
  checkDuplicateEmail
};

export default APIError;
