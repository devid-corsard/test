import { Router } from 'express';
import { deleteAllUsers, generateUsers } from '../controllers/userGenetator.js';

const router = Router();

router.get('/', generateUsers);
router.get('/delete', deleteAllUsers);

export default router;
