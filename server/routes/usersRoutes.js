import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../controllers/user.js';
import { resizeImage } from '../middleware/resizeImage.js';
import { uploadImageDisk } from '../middleware/upload.js';
import { uploadImage } from '../middleware/uploadImage.js';
import { verifyInput } from '../middleware/verifyInput.js';

const router = Router();

router.post('/', uploadImage, verifyInput, resizeImage, createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;
