import { Router } from 'express';
import { getPositions } from '../controllers/position.js';

const router = Router();

router.get('/', getPositions);

export default router;
