import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router()

// lister toutes les catégories
// http://localhost:3000/categories/getAll
categoryRouter.get('/getAll', categoryController.getAll);

// recupérer une catégorie par son id
// http://localhost:3000/categories/getOne?id=1
categoryRouter.get('/getOne', categoryController.getOne);

// modifier une catégorie existante
// http://localhost:3000/categories/updateOne
// body pour postman : { "column": "name",  "newValue":"updateNameCategory", "id": 1}
categoryRouter.post('/updateOne', categoryController.updateOne);

// suprimer une catégorie
// http://localhost:3000/categories/deleteOne
// body pour postman : {"id": 1}
categoryRouter.post('/deleteOne', categoryController.deleteOne);

// ajouter une nouvelle categorie
// http://localhost:3000/categories/addOne
// body pour postman : {"name":"newCategoryAdd"}
categoryRouter.post('/addOne', categoryController.addOne);

export default categoryRouter