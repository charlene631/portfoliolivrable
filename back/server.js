import express from 'express';
import categoryRouter from './routes/categoryRoutes.js';
import db from './config/db.js'

const app = express();
const port = 3000

app.use(express.json());


app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query("SHOW TABLES");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/categories',categoryRouter)


app.listen(port, () => {
  console.log(`serveur demarré sur http://localhost:${port}`);
});
