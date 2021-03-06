import { Router } from 'express';

import userRoutes from './user';
import * as URL from 'constants/url';

const router = Router();

router.get(URL.STATUS, (req, res) => res.send('OK'));

router.use(URL.USERS, userRoutes);

export default router;
