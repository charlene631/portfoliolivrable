import categoryModel from '../models/categoryModel.js';
import pool from '../config/db.js'; // pour accéder directement à la DB si besoin

const categoryController = {

    // lister toutes les catégories
    // http://localhost:3000/categories/getAll
    async getAll(req, res) {
        try {
            const categories = await categoryModel.getAll();
            res.json(categories[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // récupérer une catégorie par son id
    // http://localhost:3000/categories/getOne?id=1
    async getOne(req, res) {
        try {
            const id = req.query.id;
            const category = await categoryModel.getOne(id);
            res.json(category[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // modifier une catégorie existante
    // http://localhost:3000/categories/updateOne
    async updateOne(req, res) {
        try {
            const data = req.body;
            const update = await categoryModel.updateOne(data);
            res.json(update[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // supprimer une catégorie
    // http://localhost:3000/categories/deleteOne
    async deleteOne(req, res) {
        try {
            const data = req.body;
            const drop = await categoryModel.deleteOne(data);
            res.json(drop[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // ajouter une nouvelle catégorie
    // http://localhost:3000/categories/addOne
    async addOne(req, res) {
        try {
            const data = req.body;
            const add = await categoryModel.addOne(data);
            res.json(add[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // récupérer les documents d'une catégorie
    // http://localhost:3000/categories/document?id=1
    async getDocumentsByCategory(req, res) {
        const categoryId = req.query.id;
        if (!categoryId) return res.status(400).json({ error: "id de catégorie manquant" });

        try {
            const [rows] = await pool.query(
                "SELECT * FROM documents WHERE category_id = ?",
                [categoryId]
            );
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

export default categoryController;
