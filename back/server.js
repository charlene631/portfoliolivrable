import express from 'express';
import dotenv from 'dotenv';

import documentsRouter from './routes/documentsRoutes.js'; // chemin vers ta route documents

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//POur tester : A supp apres : 
app.get('/', (req, res) => {
  res.send('API fonctionne !');
});


app.use('/documents', documentsRouter);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
