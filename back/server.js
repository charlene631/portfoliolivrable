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