import express from 'express';
import mysql from 'mysql2/promise';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 3000

app.use(express.json());

const db = await mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Charlene2025!',
database: 'accessitheque',
});


app.get('/', async (req, res) => {
try {
const [rows] = await db.query("SHOW TABLES");
res.json(rows);
} catch (error) {
res.status(500).json({ error: error.message });
}
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.listen(port, () => {
console.log(`serveur demarré sur http://localhost:${port}`);
});
import dotenv from 'dotenv';

import documentsRouter from './routes/documentsRoutes.js'; 

dotenv.config();



app.use(express.json());

//POur tester : A supp apres une fois que j'ai categorie et utilisateur
// app.get('/', (req, res) => {
//   res.send('API fonctionne !');
// });


app.use('/documents', documentsRouter);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
