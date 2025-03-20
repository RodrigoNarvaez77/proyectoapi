const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");

/**
 * Controlador para obtener documentos de la tabla MAEEDO con paginación.
 */
const getAllDocuments = async (req, res) => {
  try {
    // Parámetros de consulta con valores predeterminados
    const pageSize = parseInt(req.query.pageSize) || 1000; // Tamaño de página (default: 1000)
    const offset = parseInt(req.query.offset) || 0; // Desplazamiento inicial (default: 0)

    // Ejecutar la consulta con paginación
    const rows = await sequelize.query(
      `
      SELECT * 
      FROM MAEEDO
      ORDER BY IDMAEEDO
      OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY;
      `,
      {
        type: QueryTypes.SELECT,
      }
    );

    // Verificar si hay más registros
    const hasMore = rows.length === pageSize;

    // Responder con los registros y el estado de paginación
    res.status(200).json({
      data: rows,
      nextOffset: hasMore ? offset + pageSize : null, // Próximo desplazamiento si hay más
      hasMore: hasMore, // Indicador si quedan más registros
    });
  } catch (err) {
    console.error("Error al obtener documentos:", err);
    res.status(500).json({ error: "Error al obtener documentos" });
  }
};

module.exports = {
  getAllDocuments,
};
