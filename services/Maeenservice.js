const Price = require("../models/maeenModels"); // Modelo de la tabla MAEPR
const redisClient = require("../config/redisClient"); // Cliente Redis

// Obtener todos los productos con Redis
const getAllPrice = async (forceUpdate = false) => {
  const cacheKey = "allPrice"; // Clave única para Redis

  // Si no se fuerza la actualización, intenta obtener los datos de Redis
  if (!forceUpdate) {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Precios obtenidos de Redis");
      return JSON.parse(cachedData);
    }
  }

  // Consultar directamente la base de datos
  const prices = await Price.findAll();
  console.log("hola", prices);
  if (prices.length === 0) {
    throw new Error("No se encontraron productos en la base de datos");
  }

  // Guardar en Redis con una expiración de 1 hora
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(prices));

  console.log(
    "Productos obtenidos de la base de datos y actualizados en Redis"
  );
  return prices;
};

module.exports = {
  getAllPrice,
};
