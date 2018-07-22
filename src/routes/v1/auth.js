import { Router } from 'express';
import validate from 'express-validation';
import userController from 'controllers/user';
import { loginUser } from 'validations/user';
import * as URL from 'constants/url';

const router = Router();

router
  .route(URL.LOGIN)
  .post(validate(loginUser), userController.login);

export default router;
