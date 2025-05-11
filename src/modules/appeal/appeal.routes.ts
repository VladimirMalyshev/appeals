import { Router } from 'express';
import * as controller from './appeal.controller';

const router = Router();

router.post('/', controller.createAppeal);
router.patch('/:id/start', controller.startProcessing);
router.patch('/:id/complete', controller.completeAppeal);
router.patch('/:id/cancel', controller.cancelAppeal);
//router.get('/', controller.getAppeals);
router.post('/cancel-all-in-progress', controller.canselAllInProgress);

export default router;
