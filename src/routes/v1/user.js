import { Router } from 'express';
import validate from 'express-validation';
import userController from 'controllers/user';
import { authorize } from 'middlewares/auth';
import { createUser, updateUser, updatePassword } from 'validations/user';
import * as URL from 'constants/url';
import * as ROLE from 'constants/role';

const router = Router();

router
  .route(URL.HOME)
  .get(authorize(ROLE.ADMIN), userController.list)
  .post(authorize(ROLE.ADMIN), validate(createUser), userController.create);

router
  .route(URL.ID)
  .get(authorize([ROLE.ADMIN, ROLE.USER]), userController.get)
  .put(authorize([ROLE.ADMIN, ROLE.USER]), validate(updateUser), userController.update)
  .delete(authorize([ROLE.ADMIN, ROLE.USER]), userController.remove);

router.route(`${URL.ID}${URL.CHANGE_PASSWORD}`)
  .patch(authorize([ROLE.ADMIN, ROLE.USER]), validate(updatePassword), userController.updatePassword);

export default router;
