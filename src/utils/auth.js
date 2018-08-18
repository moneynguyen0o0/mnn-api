import jwt from 'jsonwebtoken';
import config from 'config/app';

const sign = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiration }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

const isValidRoles = (roles, userRoles) => {
  if (Array.isArray(userRoles)) {
    if(Array.isArray(roles))
      return userRoles.some(userRole => roles.includes(userRole));
    return userRoles.includes(roles);
  }

  return roles.includes(userRoles);
};

export {
  sign,
  verify,
  isValidRoles
};
