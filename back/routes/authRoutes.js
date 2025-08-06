import express from 'express';
import { register, login, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

// Route de vérification email
router.get('/verify/:token', verifyEmail);

export default router;
