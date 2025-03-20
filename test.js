const sql = require("mssql");
require("dotenv").config(); // Cargar las variables de entorno

// Configuración de la conexión
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true, // Si estás conectándote a Azure, deja esto en true
    trustServerCertificate: true, // Para conexiones locales
  },
};

// Probar conexión
async function testConnection() {
  try {
    const pool = await sql.connect(dbConfig); // Conectar a la base de datos
    console.log("Conexión exitosa a SQL Server");
    await pool.close(); // Cerrar la conexión después de probar
  } catch (err) {
    console.error("Error conectando a la base de datos:", err);
  }
}

testConnection();
