import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../controllers/user.js';
import { uploadImageDisk } from '../middleware/upload.js';

const router = Router();

router.post('/', uploadImageDisk, createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;
