import { whitelist } from 'config/cors';

const handleOrigin = (origin, callback) => {
  if (whitelist.indexOf(origin) === -1) {
    return callback(new Error('Not allowed by CORS'), false);
  }

  return callback(null, true);
};

export {
  handleOrigin
};
