import pool from '../config/db.js';

// Créer un document
export const createDocument = (title, description, format, auteur_id, categorie_id, cloudinary_url) => {
  return pool.query(
    "INSERT INTO documents (title, description, format, auteur_id, categorie_id, cloudinary_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
    [title, description, format, auteur_id, categorie_id, cloudinary_url]
  );
};

// Récupérer tous les documents
export const getAllDocuments = () => {
  return pool.query(
    `SELECT documents.*, categories.nom AS categorie 
     FROM documents
     LEFT JOIN categories ON documents.categorie_id = categories.id`
  );
};

// Récupérer un document par ID
export const getDocumentById = (id) => {
  return pool.query("SELECT * FROM documents WHERE id = ?", [id]);
};

// Mettre à jour un document
export const updateDocument = (id, title, description, format, categorie_id, cloudinary_url) => {
    return pool.query(
      "UPDATE documents SET title=?, description=?, format=?, categorie_id=?, cloudinary_url=?, updated_at=NOW() WHERE id=?",
      [title, description, format, categorie_id, cloudinary_url, id]
    );
};

// Supprimer un document
export const deleteDocument = (id) => {
  return pool.query("DELETE FROM documents WHERE id = ?", [id]);
};
