import { Router } from 'express';
import { register, login, refresh, logout } from './auth.controller';
import { authenticate } from './auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', authenticate, logout);

export default router;
