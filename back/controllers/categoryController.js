import categoryModel from '../models/categoryModel.js';
const categoryController = {

    //lister toutes les catégories
    // http://localhost:3000/categories/getAll
    async getAll(req, res) {
        const categories = await categoryModel.getAll()
        res.json(categories[0]);
    },

    // recupérer une catégorie par son id
    // // http://localhost:3000/categories/getOne?id=1
    async getOne(req, res) {
        const id = req.query.id
        const category = await categoryModel.getOne(id)
        res.json(category[0]);
    },

    // modifier une catégorie existante
    // http://localhost:3000/categories/updateOne
    async updateOne(req, res) {
        const data = req.body
        const update = await categoryModel.updateOne(data)
        res.json(update[0]);
    },

    // suprimer une catégorie
    // http://localhost:3000/categories/deleteOne
    async deleteOne(req, res) {
        const data = req.body
        const drop = await categoryModel.deleteOne(data)
        res.json(drop[0]);
    },

    // ajouter une nouvelle categorie
    // http://localhost:3000/categories/addOne
    async addOne(req, res) {
        const data = req.body
        const add = await categoryModel.addOne(data)
        res.json(add[0]);
    }

}
export default categoryController