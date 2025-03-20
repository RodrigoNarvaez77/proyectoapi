const Redis = require("ioredis");

const redisClient = new Redis({
  host: "127.0.0.1", // Cambia si tu Redis está en otro servidor
  port: 6379, // Puerto por defecto
  retryStrategy: (times) => Math.min(times * 50, 2000), // Estrategia de reintento
});

redisClient.on("connect", () =>
  console.log("✅ Conectado a Redis con ioredis")
);
redisClient.on("error", (err) => console.error("❌ Error en Redis:", err));

module.exports = redisClient;
