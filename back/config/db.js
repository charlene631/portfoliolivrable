import mysql from 'mysql2/promise';

import dotenv from 'dotenv'

dotenv.config(); // Charge les variables d'environnement depuis .env

// Créer un pool de conexions MYSQL réutilisable dans toute l'application
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,           // Attendre la libération d'une connexion si pool plein
    connectionLimit: 5,                 // Nombre max de connexions simultanées dans le pool
    queueLimit: 0                       // Pas de limite à la file d'attente
})

export default pool;