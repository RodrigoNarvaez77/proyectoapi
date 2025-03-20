const productService = require("../services/Productservice"); // Importar el servicio

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    console.error("Error al obtener producto:", err);
    if (err.message === "Producto no encontrado") {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Error al obtener producto" });
    }
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
