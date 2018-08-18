const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mnn-api:mnn000@ds137631.mlab.com:37631/mnn-api';
const JWT_SECRET = process.env.JWT_SECRET || 'secret!!!';

const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';

export {
  isDevelopment,
  isProduction
};

export default {
  server: {
    host: HOST,
    port: PORT,
    env: NODE_ENV
  },
  db: {
    mongo: {
      uri: MONGO_URI
    }
  },
  jwt: {
    secret: JWT_SECRET,
    expiration: 10800
  },
  baseUrl: `http://${HOST}:${PORT}`
};
