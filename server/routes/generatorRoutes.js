import { Router } from 'express';
import { deleteAllUsers, generateUsers } from '../controllers/userGenetator.js';

const router = Router();

router.post('/', generateUsers);
router.delete('/', deleteAllUsers);

export default router;
