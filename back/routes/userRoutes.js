import express from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

import { verifyToken, hasRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken); // toutes les routes demandent d'être connecté

router.get('/', hasRole('admin'), getAllUsersController); // liste tous les utilisateurs
router.get('/:id', hasRole('admin'), getUserByIdController);
router.put('/:id', hasRole('admin'), updateUser);
router.delete('/:id', hasRole('admin'), deleteUser);

export default router;
