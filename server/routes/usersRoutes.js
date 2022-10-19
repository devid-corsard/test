import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../controllers/user.js';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('photo'), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;
