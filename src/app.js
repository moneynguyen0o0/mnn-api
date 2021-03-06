import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';

import routesV1 from 'routes/v1';
import routesV2 from 'routes/v2';
import config from 'config/app';
import { notFound, logErrors, handleErrors } from 'middlewares/error';
import { handleOrigin } from 'utils/cors';
import { isProduction } from 'config/env';
import * as URL from 'constants/url';

const run = () => {
  const app = express();

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors({
    credentials: true,
    origin: handleOrigin
  }));

  // trust proxy in production from local nginx front server
  if (isProduction) {
    app.set('trust proxy', 'loopback');

    // secure apps by setting various HTTP headers
    app.use(helmet());

    // gzip compression
    app.use(compress());
  }

  // lets you use HTTP verbs such as PUT or DELETE
  // in places where the client doesn't support it
  app.use(methodOverride());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json({ limit: '50mb' }));

  // mount api v1 routes
  app.use(URL.V1, routesV1);
  // mount api v2 routes
  app.use(URL.V2, routesV2);

  // catch 404 and forward to error handler
  app.use(notFound());

  // send stacktrace only during development
  app.use(logErrors());

  // error handler
  app.use(handleErrors());

  app.listen(config.server.port, () => {
    console.log(`===> App running on ${config.baseUrl}`);
  });
};

export default { run };
