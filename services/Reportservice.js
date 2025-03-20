const sequelize = require("../config/db"); // Instancia de Sequelize
const redisClient = require("../config/redisClient"); // Cliente Redis con ioredis
const { QueryTypes } = require("sequelize");
const zlib = require("zlib"); // Para compresión opcional

const getReportData = async (startDate, endDate) => {
  const cacheKey = `report:${startDate}-to-${endDate}`;
  let totalProcessed = 0;
  let offset = 0;
  const pageSize = 5000;

  console.log("🔄 Iniciando procesamiento por lotes...");

  while (true) {
    try {
      // Consultar la base de datos en lotes
      const fetchedData = await sequelize.query(
        `
        SELECT 
            FEEMLI AS FECHA,
            MAEEDO.SUDO,
            TABSU.NOKOSU AS SUCURSAL,
            MAEDDO.NUDO AS NUM_DOC,
            MAEDDO.TIDO AS TIPO_DOC,
            KOPRCT AS CODIGO,
            MAEDDO.NOKOPR AS PRODUCTO,
            NOKOFM AS CATEGORIA,
            CAPRCO1 AS CANTIDAD,
            CASE WHEN MAEDDO.TIDO = 'NCV' THEN -1 * VANELI ELSE VANELI END AS VALOR_NETO,
            CASE WHEN MAEDDO.TIDO = 'NCV' THEN -1 * (PPPRPM * CAPRCO1) ELSE (PPPRPM * CAPRCO1) END AS COSTO_TOTAL,
            CASE WHEN MAEDDO.TIDO = 'NCV' THEN -1 * (VANELI - (PPPRPM * CAPRCO1)) ELSE (VANELI - (PPPRPM * CAPRCO1)) END AS MARGEN
        FROM MAEEDO (NOLOCK)
        LEFT JOIN MAEDDO ON MAEEDO.IDMAEEDO = MAEDDO.IDMAEEDO
        LEFT JOIN MAEPR (NOLOCK) ON MAEDDO.KOPRCT = KOPR
        LEFT JOIN TABFM (NOLOCK) ON FMPR = KOFM
        LEFT JOIN TABSU (NOLOCK) ON TABSU.KOSU = MAEEDO.SUDO
        WHERE FEEMLI BETWEEN '${startDate}' AND '${endDate}'
          AND MAEDDO.TIDO IN ('FCV', 'FDV', 'BLV', 'NCV')
        ORDER BY FEEMLI ASC
        OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;
        `,
        { type: QueryTypes.SELECT }
      );

      // Si no hay más registros, salir del bucle
      if (fetchedData.length === 0) break;

      // Comprimir datos antes de almacenarlos en Redis
      const compressedData = zlib
        .gzipSync(JSON.stringify(fetchedData))
        .toString("base64");

      // Guardar en Redis con clave secuencial
      await redisClient.set(
        `${cacheKey}:${offset / pageSize}`,
        compressedData,
        "EX",
        86400
      ); // Expira en 24h

      // Incrementar el total y avanzar en la paginación
      totalProcessed += fetchedData.length;
      offset += pageSize;

      console.log(
        `✅ Se procesaron ${totalProcessed} registros hasta ahora...`
      );
    } catch (error) {
      console.error("❌ Error en la consulta SQL:", error);
      break;
    }
  }

  // Guardar total de lotes en Redis para recuperación
  await redisClient.set(
    `${cacheKey}:totalBatches`,
    offset / pageSize,
    "EX",
    86400
  );

  console.log(`✅ Total de registros procesados: ${totalProcessed}`);
  return totalProcessed;
};

// 🔥 Recuperar TODOS los datos desde Redis sin sobrecargar la memoria
const getCachedData = async (startDate, endDate) => {
  const cacheKey = `report:${startDate}-to-${endDate}`;
  const totalBatches = await redisClient.get(`${cacheKey}:totalBatches`);

  if (!totalBatches) {
    console.log(
      "⚠️ No hay datos en caché. Debes ejecutar `getReportData` primero."
    );
    return [];
  }

  console.log(`🔄 Recuperando ${totalBatches} lotes desde Redis...`);
  let results = [];

  for (let i = 0; i < totalBatches; i++) {
    const batchKey = `${cacheKey}:${i}`;
    try {
      const cachedData = await redisClient.get(batchKey);

      if (cachedData) {
        // Descomprimir los datos
        const decompressedData = JSON.parse(
          zlib.gunzipSync(Buffer.from(cachedData, "base64"))
        );
        results = results.concat(decompressedData);
      }
    } catch (error) {
      console.error(`❌ Error al descomprimir lote ${batchKey}:`, error);
    }
  }

  console.log(`✅ Se recuperaron ${results.length} registros desde Redis.`);
  return results;
};

module.exports = { getReportData, getCachedData };
