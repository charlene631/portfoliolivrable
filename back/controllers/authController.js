import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByEmail,
  verifyUserEmail,
} from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.FRONTEND_URL;

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
    console.log({ name, lastname, email, hashedPassword, role });

    const userId = await createUser({
      name,
      lastname,
      email,
      password: hashedPassword,
      role: role || "user",
      is_verified: false,
    });

    const verificationToken = jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const verificationUrl = `${CLIENT_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail({
      to: email,
      subject: "Vérification de votre adresse email",
      html: `Bonjour ${name},<br><br>
        Merci de créer un compte. Veuillez vérifier votre adresse en cliquant sur ce lien :
        <a href="${verificationUrl}">Vérifier mon compte</a><br><br>
        Ce lien est valable une heure.`,
    });

    res.status(201).json({
      message:
        "Utilisateur créé. Vérifiez votre email pour activer votre compte.",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

// --- VÉRIFICATION EMAIL ---
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    

    const decoded = jwt.verify(token, JWT_SECRET);
     

    const userId = decoded.id || decoded.userId;

    const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    const user = userRows[0];

    if (user.is_verified) {
      return res.status(400).json({ message: "Compte déjà vérifié." });
    }

    await verifyUserEmail(userId);

    res.json({
      message:
        "Email vérifié avec succès. Vous pouvez maintenant vous connecter.",
    });
  } catch (error) {
    console.error("Erreur de vérification d'email :", error);
    res.status(400).json({ message: "Lien invalide ou expiré." });
  }
};

// --- CONNEXION ---
export const login = async (req, res) => {
  const { email, password } = req.body;

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

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};

// Déconnexion (optionnelle, peut être gérée côté client)
export const logout = (req, res) => {
  res.json({ message: "Déconnexion réussie." });
};
