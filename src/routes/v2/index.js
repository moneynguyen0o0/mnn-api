import { Router } from 'express';

import authRoutes from './auth';
import userRoutes from './user';
import * as URL from 'constants/url';

const router = Router();

router.get(URL.STATUS, (req, res) => res.send('OK'));

router.use(URL.AUTH, authRoutes);
router.use(URL.USERS, userRoutes);

export default router;
