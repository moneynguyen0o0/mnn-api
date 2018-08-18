const NODE_ENV = process.env.NODE_ENV || 'development';

const isDevelopment = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production';

export {
  isDevelopment,
  isProduction
};
