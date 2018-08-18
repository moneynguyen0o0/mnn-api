import mongoose from 'mongoose';
import config from 'config';

const connect = () => {
  const uri = config.db.mongo.uri;

  // DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version.
  // To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect
  mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log(`===> Error connecting to ${uri} because of ${err}`);
    } else {
      console.log(`===> Succeeded in connecting to ${uri}`);
    }
  });
};

const run = () => {
  connect();

  mongoose.connection.on('error', (err) => {
    console.log(`===> Mongoose default connection has occured ${err}`);
  });

  mongoose.connection.on('disconnected', connect);
};

export default { run };
