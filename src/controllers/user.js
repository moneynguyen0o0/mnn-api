import { omit } from 'lodash';
import User from 'models/user';
import config from 'config/app';
import APIError, { checkDuplicateEmail } from 'utils/error';
import { sign } from 'utils/auth';

const login = async (req, res, next) => {
  try {
    const { body: { email, password } } = req;
    const user = await User.authenticate(email, password);
    const convertedUser = user.transform();
    const token = await sign(convertedUser);
    const expires = Date.now() + parseInt(config.jwt.expiration);

    res.json({ user: convertedUser, token, expires });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const convertedUser = user.transform();

    res.json(convertedUser);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const convertedUsers = users.map(user => user.transform());

    res.json(convertedUsers);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json(savedUser.transform());
  } catch (err) {
    next(checkDuplicateEmail(err));
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, omit(user, ['_id']), { new: true }); // omit or pick fields

    res.json(updatedUser.transform());
  } catch (err) {
    next(checkDuplicateEmail(err));
  }
};

const remove = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err));
};

const updatePassword = async (req, res, next) => {
  try {
    const {
      body: {
        currentPassword,
        newPassword
      },
      params: { id }
    } = req;

    const user = await User.findById(id);
    if (!user) throw new APIError({ message: 'User ID not found', status: 401 });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new APIError({ message: 'Current password invalid', status: 401 });

    user.password = newPassword;
    user.updated = new Date();

    user.save()
      .then(() => res.json({ message: 'Succeed' }))
      .catch(err => next(err));
  } catch (err) {
    next(err);
  }
};

export default {
  login,
  get,
  list,
  create,
  update,
  remove,
  updatePassword
};
