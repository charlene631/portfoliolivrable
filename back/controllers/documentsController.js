import * as Documents from "../models/documentsModel.js";

// Récupérer tous les documents
export async function listDocuments(req, res) {
  try {
    const [documents] = await Documents.getAllDocuments();
    res.status(200).json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible de récupérer les documents" });
  }
}

// Ajouter un document
export async function addDocument(req, res) {
  const { title, description, format, auteur_id, categorie_id } = req.body;

  // Vérifier si un fichier a été uploadé
  if (!req.file) {
    return res.status(400).json({ message: "Le fichier est requis !" });
  }

  try {
    // Récupération de l'URL Cloudinary
    const cloudinary_url = req.file.path;

    // Insertion du document
    await Documents.createDocument(
      title,
      description,
      format,
      auteur_id,
      categorie_id,
      cloudinary_url
    );

    res.status(201).json({
      message: "Document créé avec succès",
      document: { title, description, format, cloudinary_url },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la création du document" });
  }
}

// Mettre à jour un document
export async function putDocument(req, res) {
  const { id } = req.params;
  const { title, description, format, categorie_id } = req.body;

  try {
    let cloudinary_url;

    if (req.file) {
      // Nouveau fichier uploadé
      cloudinary_url = req.file.path;
    } else {
      // Pas de nouveau fichier alors on reupere l'URL actuel
      const [rows] = await Documents.getDocumentById(id);
      if (!rows.length) {
        return res.status(404).json({ error: "Document non trouvé" });
      }
      cloudinary_url = rows[0].cloudinary_url;
    }

    await Documents.updateDocument(
      id,
      title,
      description,
      format,
      categorie_id,
      cloudinary_url
    );
    res.status(200).json({ message: 'Document modifié avec succès', document: { id, title, description, format, cloudinary_url } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la modification du document' });
  }
}

// Supprimer un document
export async function deleteDocument(req, res) {
  const { id } = req.params;

  try {
    await Documents.deleteDocument(id);
    res.status(200).json({ message: 'Document supprimé avec succès', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression du document' });
  }
}

// Récupérer un document par ID
export async function getDocumentById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await Documents.getDocumentById(id);
    if (!rows.length)
      return res.status(404).json({ error: "Document non trouvé" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de récupérer le document' });
  }
}
