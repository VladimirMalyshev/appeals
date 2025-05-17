import { Router } from 'express';
import appealRoutes from '../modules/appeal/appeal.routes';

const router = Router();

router.use('/appeals', appealRoutes);

export default router;
