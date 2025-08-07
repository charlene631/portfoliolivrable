import express from 'express';
import { register, login, verifyEmail, logout } from '../controllers/authController.js';

const router = express.Router();

// Route d'inscription
router.post('/register', (req, res, next) => {
  console.log("Route /register appelée");
  next();
}, register);


// Route de connexion
router.post('/login', login);

// Route de vérification email
router.get('/verify/:token', verifyEmail);

// Route de déconnexion (optionnelle)
router.post('/logout', logout);


export default router;
