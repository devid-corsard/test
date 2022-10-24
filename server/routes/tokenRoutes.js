import { Router } from 'express';
import { confirmToken, getToken } from '../controllers/token.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.get('/', getToken);
router.post('/verify', verifyToken, confirmToken);

export default router;
