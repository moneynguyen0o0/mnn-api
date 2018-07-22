import appConfig from 'config/app';

const ENV = appConfig.server.env;

const isDevelopment = ENV === 'development';
const isProduction = ENV === 'production';

export { isDevelopment, isProduction };
