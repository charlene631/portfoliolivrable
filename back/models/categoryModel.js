import pool from '../config/db.js';

const categoryModel = {

    // lister toutes les catégories
    // http://localhost:3000/categories/getAll
    async getAll() {
        try {
            const response = await pool.query("SELECT * FROM categories WHERE 1")
            return response
        }
        catch (error) {
            throw new Error("Erreur model getAll", error)
        }

    },

    // recupérer une catégorie par son id
    // http://localhost:3000/categories/getOne
    async getOne(id) {
        try {
            const response = await pool.query(`SELECT * FROM categories WHERE id = ?`, [id])
            return response
        }
        catch (error) {
            throw new Error("Erreur model getOne", error)
        }
    },

    // modifier une catégorie existante
    // http://localhost:3000/categories/updateOne
    async updateOne(data) {
        try {
            const columnTable = []
            const column = data.column
            const value = data.newValue
            const id = data.id

            const tableColumn = await pool.query('SHOW COLUMNS FROM categories;')
            tableColumn[0].forEach(element => {
                columnTable.push(element.Field)
            });
                 if(!columnTable.includes(column)){
                    throw new Error("Colonne non autorisée")
                }

            const query = `UPDATE categories SET ${column} = ? WHERE id = ? `
            const response = await pool.query(query, [value, id])
            return response
        }
        catch (error) {
            throw new Error("Erreur model updateOne", error)
        }
    },

    // suprimer une catégorie
    // http://localhost:3000/categories/deleteOne
    async deleteOne(data) {
        try {
            const id = data.id
            console.log(id)
            const response = await pool.query(`DELETE FROM categories WHERE id = ? `, [id])
            return response
        }
        catch (error) {
            console.error(error)
            throw new Error("Erreur model deleteOne", error)
        }
    },

    // ajouter une nouvelle categorie
    // http://localhost:3000/categories/addOne
    async addOne(data) {
        try {
            const name = data.name
            const response = await pool.query(`INSERT INTO categories (name) VALUES (?) `, [name])
            return response
        }
        catch (error) {
            throw new Error("Erreur model addOne", error)
        }
    }
}
export default categoryModel