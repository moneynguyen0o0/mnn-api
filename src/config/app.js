const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://abc:xyz@something.mlab.com:port/project-name';
const JWT_SECRET = process.env.JWT_SECRET || 'secret!!!';

export default {
  server: {
    host: HOST,
    port: PORT
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
