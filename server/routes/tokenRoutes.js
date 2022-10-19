import { Router } from 'express';
import { getToken } from '../controllers/token.js';

const router = Router();

router.get('/', getToken);

export default router;
