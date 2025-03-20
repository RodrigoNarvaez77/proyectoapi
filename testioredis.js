const redisClient = require("./config/redisClient");
const zlib = require("zlib");

(async () => {
  const cacheKey = "report:2023-01-01-to-2025-02-21:0"; // Primer lote
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      const decompressedData = JSON.parse(
        zlib.gunzipSync(Buffer.from(cachedData, "base64"))
      );
      console.log("📊 Primeros 5 registros:", decompressedData.slice(0, 5)); // Muestra los primeros 5 registros
    } else {
      console.log("❌ No hay datos en Redis.");
    }
  } catch (error) {
    console.error("❌ Error al recuperar datos:", error);
  }
})();
