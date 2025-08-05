import pool from '../config/db.js';

// Créer un utilisateur
export const createUser = async ({ name, lastname, email, password, role = 'user' }) => {
  const [result] = await pool.execute(
    `INSERT INTO users (name, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)`,
    [name, lastname, email, password, role]
  );
  return result.insertId;
};

// Récupérer un utilisateur par email
export const getUserByEmail = async (email) => {
  const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
};
