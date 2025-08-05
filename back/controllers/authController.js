import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
      role: role || "user", // Par défaut, le rôle est "user"
    });

    await newUser.save();

    res.status(201).json({ message: "Inscription réussie.", userId: newUser._id });
  } catch (error) {
    if (error.code === 11000) {
    return res.status(400).json({ message: "Ce nom d'utilisateur ou cet email est déjà utilisé." });
  }
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

// Connexion au compte utilisateur avec vérification du mot de passe et génération de token JWT

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign({ userId: user._id, role: user.role  }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Connexion réussie.", token, user: { id: user._id, username: user.username, email: user.email} });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
