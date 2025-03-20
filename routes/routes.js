const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const { getAllDocuments } = require("../controllers/maeedoController");
const { getReport } = require("../controllers/analisdecategoriasController");
const { getAllService } = require("../controllers/maeenController");

const router = express.Router();

// Rutas para productos
router.get("/products", getAllProducts); // Obtener todos los productos
router.get("/products/:id", getProductById); // Obtener un producto por ID

// Rutas para documentos
router.get("/maeedo", getAllDocuments); // Obtener todos los documentos

// Ruta para el informe
router.get("/report", getReport);

// Ruta para Maepr
router.get("/maeen", getAllService);

module.exports = router;
