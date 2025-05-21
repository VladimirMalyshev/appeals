import { Router } from 'express';
import * as controller from './appeal.controller';
import { authorize, authenticate } from '../auth/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize('ADMIN', 'CLIENT'), controller.createAppeal);
router.patch('/:id/start', authenticate, authorize('ADMIN', 'CLIENT'), controller.startProcessing);
router.patch(
  '/:id/complete',
  authenticate,
  authorize('ADMIN', 'EMPLOYEE'),
  controller.completeAppeal
);
router.patch('/:id/cancel', authenticate, authorize('ADMIN', 'EMPLOYEE'), controller.cancelAppeal);
router.get('/', authenticate, authorize('ADMIN', 'EMPLOYEE'), controller.getAppeals);
router.post(
  '/cancel-all-in-progress',
  authenticate,
  authorize('ADMIN'),
  controller.canselAllInProgress
);

export default router;
