import { Router } from 'express';
import authRoutes from 'routes/v1/auth';
import userRoutes from 'routes/v1/user';
import * as URL from 'constants/url';

const router = Router();

router.get(URL.STATUS, (req, res) => res.send('OK'));

router.use(URL.AUTH, authRoutes);
router.use(URL.USERS, userRoutes);

export default router;
