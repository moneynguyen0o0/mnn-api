const HOST = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 3000;

export default {
  server: {
    host: HOST,
    port: PORT,
    env: process.env.NODE_ENV || 'development'
  },
  db: {
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://abc:xyz@something.mlab.com:port/project-name'
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret!!!',
    expiration: 10800
  },
  baseUrl: `http://${HOST}:${PORT}`
};
