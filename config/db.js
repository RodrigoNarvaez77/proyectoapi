const { Sequelize } = require("sequelize");
require("dotenv").config(); // Para usar variables de entorno

// Configurar la conexión
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: "mssql", // Define el dialecto como SQL Server
    port: parseInt(process.env.DB_PORT) || 1433, // Puerto de conexión
    dialectOptions: {
      encrypt: true, // Habilitar cifrado si es necesario (por ejemplo, en Azure)
      trustServerCertificate: true, // Si es una conexión local o no segura
    },
  }
);

// Probar la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos con Sequelize");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

module.exports = sequelize;
