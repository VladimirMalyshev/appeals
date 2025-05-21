import { Router } from 'express';
import appealRoutes from '../modules/appeal/appeal.routes';
import authRoutes from '../modules/auth/auth.routes';
import { authenticate } from '../modules/auth/auth.middleware';

const router = Router();

router.use('/appeals', authenticate, appealRoutes);
router.use('/auth', authRoutes);

export default router;
