
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import APIError from 'utils/error';
import * as ROLE from 'constants/role';
import * as GENDER from 'constants/role';

const roles = [ROLE.USER, ROLE.ADMIN];
const genders = [GENDER.MALE, GENDER.FEMALE];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
  },
  fullname: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true
  },
  dob: Date,
  gender: {
    type: String,
    enum: genders
  },
  picture: {
    type: String,
    trim: true
  },
  roles: {
    type: String,
    enum: roles,
    default: ROLE.USER
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  enable: {
    type: Boolean,
    default: false
  },
  token: String,
  resetPasswordExpires: Date
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);

    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.method({
  comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },

  transform() {
    const fields = ['_id', 'fullname', 'email', 'dob', 'gender', 'picture', 'roles', 'created'];

    return fields.reduce((acc, field) => {
      acc[field] = this[field];
      return acc;
    }, {});
  }
});

userSchema.statics = {
  roles,

  async authenticate(email, password) {
    try {
      const user = await this.findOne({ email });
      if (!user) throw new APIError({ message: 'Email not found', status: 401 });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new APIError({ message: 'Invalid password', status: 401 });

      return user;
    } catch (err) {
      throw err;
    }
  },

  list({ page = 1, limit = 30 }) {
    return this.find({})
      .sort({ created: -1 })
      .skip(limit * (page - 1))
      .limit(limit);
  }
};

export default mongoose.model('User', userSchema);
