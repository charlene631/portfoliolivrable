import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import documentsRouter from './routes/documentsRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/categories', categoryRouter);
app.use('/documents', documentsRouter);


app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
