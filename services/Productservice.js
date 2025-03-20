const Product = require("../models/productModels"); // Modelo de la tabla MAEPR
const redisClient = require("../config/redisClient"); // Cliente Redis

// Obtener todos los productos con Redis
const getAllProducts = async (forceUpdate = false) => {
  const cacheKey = "allProducts"; // Clave única para Redis

  // Si no se fuerza la actualización, intenta obtener los datos de Redis
  if (!forceUpdate) {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Productos obtenidos de Redis");
      return JSON.parse(cachedData);
    }
  }

  // Consultar directamente la base de datos
  const products = await Product.findAll();
  if (products.length === 0) {
    throw new Error("No se encontraron productos en la base de datos");
  }

  // Guardar en Redis con una expiración de 1 hora
  await redisClient.set(cacheKey, JSON.stringify(products), "EX", 3600);

  console.log(
    "Productos obtenidos de la base de datos y actualizados en Redis"
  );
  return products;
};

// Obtener un producto por ID con Redis
const getProductById = async (id, forceUpdate = false) => {
  const cacheKey = `product:${id}`; // Clave única para Redis por producto

  // Si no se fuerza la actualización, intenta obtener los datos de Redis
  if (!forceUpdate) {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log(`Producto ${id} obtenido de Redis`);
      return JSON.parse(cachedData);
    }
  }

  // Consultar directamente la base de datos
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error(`Producto con ID ${id} no encontrado`);
  }

  // Guardar en Redis con una expiración de 1 hora
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(product));

  console.log(
    `Producto ${id} obtenido de la base de datos y actualizado en Redis`
  );
  return product;
};

// Invalidar todo el caché de productos
const invalidateAllProductsCache = async () => {
  const cacheKey = "allProducts"; // Clave de todos los productos
  await redisClient.del(cacheKey);
  console.log("Caché de todos los productos invalidado");
};

// Invalidar el caché de un producto específico
const invalidateProductCache = async (id) => {
  const cacheKey = `product:${id}`;
  await redisClient.del(cacheKey);
  console.log(`Caché del producto ${id} invalidado`);
};

module.exports = {
  getAllProducts,
  getProductById,
  invalidateAllProductsCache,
  invalidateProductCache,
};
