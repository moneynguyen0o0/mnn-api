import { Router } from 'express';
import validate from 'express-validation';

import userController from 'controllers/user';
import { createUser, updateUser } from 'validations/user';
import * as URL from 'constants/url';

const router = Router();

router
  .route(URL.HOME)
  .get(userController.list)
  .post(validate(createUser), userController.create);

router
  .route(URL.ID)
  .get(userController.get)
  .put(validate(updateUser), userController.update)
  .delete(userController.remove);

export default router;
