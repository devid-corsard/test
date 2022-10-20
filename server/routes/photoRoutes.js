import { Router } from 'express';
import { getPhoto } from '../controllers/photo.js';

const router = Router();

router.get('/:id', getPhoto);

export default router;
