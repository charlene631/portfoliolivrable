import express from 'express';
import {  listDocuments,  getDocumentById,  addDocument, putDocument, deleteDocument } from '../controllers/documentsController.js';
import upload from '../middlewares/uploadCloudinary.js';

const router = express.Router();

router.get('/', listDocuments);
router.get('/:id', getDocumentById);
router.post('/', upload.single('file'), addDocument);
router.put('/:id', upload.single('file'), putDocument);
router.delete('/:id', deleteDocument);

export default router;
