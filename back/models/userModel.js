import { getDB } from '../config/db.js';

// Créer un utilisateur
export const createUser = async ({ name, email, password, role = 'user' }) => {
  const db = getDB();
  const [result] = await db.execute(
    `INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)`,
    [name, email, password, role]
  );
  return result.insertId;
};

// Récupérer un utilisateur par email
export const getUserByEmail = async (email) => {
  const db = getDB();
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
};

// Récupérer un utilisateur par username
export const getUserByUsername = async (username) => {
  const db = getDB();
  const [rows] = await db.execute(`SELECT * FROM users WHERE username = ?`, [username]);
  return rows[0];
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  const db = getDB();
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
};
