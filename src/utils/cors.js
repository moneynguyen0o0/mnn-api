import { whitelist } from 'config/cors';

const handleOrigin = (origin, callback) => {
  // allow requests with no origin (like mobile apps or curl requests)
  if(!origin) return callback(null, true);

  if (whitelist.indexOf(origin) === -1) {
    return callback(new Error('Not allowed by CORS'), false);
  }

  return callback(null, true);
};

export {
  handleOrigin
};
