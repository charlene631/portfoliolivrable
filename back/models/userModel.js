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
  const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [email ?? null]);
  return rows[0];
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id]);
  return rows[0];
};

// Liste tous les utilisateurs
export const getAllUsers = async () => {
  const [rows] = await pool.execute(`SELECT * FROM users`);
  return rows;
};

// Met à jour un utilisateur par ID
export const updateUserById = async (id, { name, lastname, email, role }) => {
  const sql = `UPDATE users SET name = ?, lastname = ?, email = ?, role = ? WHERE id = ?`;
  const [result] = await pool.execute(sql, [name, lastname, email, role, id]);
  return result;
};

// Supprime un utilisateur par ID
export const deleteUserById = async (id) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  const [result] = await pool.execute(sql, [id]);
  return result;
};

