import APIError from 'utils/error';

const notFound = () => (req, res, next) => {
  return next(new APIError({ message: 'Not found', status: 404 }));
};

const logErrors = () => (err, req, res, next) => {
  console.error(err);

  next(err);
};

const handleErrors = () => (err, req, res, next) => {
  const {
    status,
    message,
    errors
  } = err;

  const error = {
    message: message || 'Internal Server Error',
    errors
  };

  res.status(status || 500);
  res.json(error);
};

export {
  notFound,
  logErrors,
  handleErrors
};
