const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/routes");
//const validateApiKey = require("./middlewares/validateApiKey"); // Importar el middleware

const app = express();
const PORT = process.env.PORT || 3000;
//hola
// Middleware
app.use(express.json());

// Aplicar validación de API Key solo a las rutas de la API
//app.use("/api", validateApiKey, productRoutes);
app.use("/api", productRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
