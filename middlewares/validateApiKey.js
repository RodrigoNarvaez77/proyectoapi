require("dotenv").config();

const validateApiKey = (req, res, next) => {
  const apiKey =
    req.headers["x-api-key"] || // Desde el encabezado
    req.query.api_key; // Desde la URL

  const validApiKey = process.env.API_KEY;

  console.log("API Key recibida:", apiKey);
  console.log("API Key esperada:", validApiKey);

  if (!apiKey) {
    return res.status(401).json({ error: "API Key es requerida" });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({ error: "API Key inválida" });
  }

  next();
};

module.exports = validateApiKey;
