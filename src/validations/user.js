import Joi from 'joi';
import User from 'models/user';

export default {
  // POST /v1/auth/login
  loginUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128)
    }
  },
  // POST /v1/users
  createUser: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      fullname: Joi.string().max(128),
      roles: Joi.string().valid(User.roles)
    }
  },
  // PUT /v1/users/:id
  updateUser: {
    body: {
      email: Joi.string().email(),
      password: Joi.string().min(6).max(128),
      fullname: Joi.string().max(128),
      roles: Joi.string().valid(User.roles)
    },
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
    }
  },
  // PATCH /v1/users/:id
  updatePassword: {
    body: {
      currentPassword: Joi.string().min(6).max(128),
      newPassword: Joi.string().min(6).max(128)
    },
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
    }
  }
};
