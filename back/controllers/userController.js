import pool from '../config/db.js';

// Liste tous les utilisateurs (sans les passwords)
export const getAllUsersController = async (req, res) => {
  try {
    const [users] = await pool.execute('SELECT id, name, lastname, email, role, created_at FROM users');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
};

// Récupérer un utilisateur par ID
export const getUserByIdController = async (req, res) => {
  const id = req.params.id;
  try {
    const [users] = await pool.execute('SELECT id, name, lastname, email, role, created_at FROM users WHERE id = ?', [id]);
    if (users.length === 0) return res.status(404).json({ message: "Utilisateur non trouvé." });
    res.status(200).json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur." });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, lastname, email, role } = req.body;

  try {
    // Optionnel: vérifier la validité du role (user/admin)
    const [result] = await pool.execute(
      `UPDATE users SET name = ?, lastname = ?, email = ?, role = ? WHERE id = ?`,
      [name, lastname, email, role, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Utilisateur non trouvé." });

    res.status(200).json({ message: "Utilisateur mis à jour." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Utilisateur non trouvé." });
    res.status(200).json({ message: "Utilisateur supprimé." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};

// Exemple de route protégée sans admin (nécessite une authentification)
export const protectedExample = (req, res) => {
  res.json({ message: `Bonjour ${req.user.email}, accès autorisé !` });
};
