const priceService = require("../services/Maeenservice"); // Importar el servicio

// Obtener todos los productos
const getAllService = async (req, res) => {
  try {
    const service = await priceService.getAllPrice();
    res.status(200).json(service);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = {
  getAllService,
};
