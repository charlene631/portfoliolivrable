import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  createUser,
  getUserByEmail
} from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

// --- INSCRIPTION ---
export const register = async (req, res) => {
  const { name, lastname, email, password, role } = req.body;

  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser({
      name,
      lastname, 
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({ message: "Inscription réussie.", userId });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

// --- CONNEXION ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Vérifie que les champs sont bien présents
  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
