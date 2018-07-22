import APIError from 'utils/error';
import { verify, isValidRoles } from 'utils/auth';
import * as ROLE from 'constants/role';

const authorize = (roles = ROLE.USER) => async (req, res, next) => {
  const token = getToken(req);
  const authErr = new APIError({ message: 'No Authorization was found', status: 401 });

  if (!token) return next(authErr);

  try {
    const user = await verify(token);

    if (!isValidRoles(roles, user.roles)) {
      next(new APIError({ message: 'Forbidden', status: 403 }));
    }

    req.user = user;

    next();
  } catch (err) {
    next(authErr);
  }
};

const getToken = (req) => {
  const bearerHeader = req.header('Authorization');
  if (bearerHeader) {
    const parts = bearerHeader.split(' ');

    if (/^Bearer$/.test(parts[0])) { // test schema
      return parts[1]; // get token
    }
  }

  const token = req.body.token;
  if (token) return token;

  return null;
};

export {
  authorize
};
