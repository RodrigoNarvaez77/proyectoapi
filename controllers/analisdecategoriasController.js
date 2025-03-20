const reportService = require("../services/Reportservice"); // Importar el servicio

const getReport = async (req, res) => {
  try {
    // Generar fechas dinámicas
    const startDate = "2023-01-01";
    const endDate = new Date().toISOString().split("T")[0]; // Fecha de hoy en formato ISO

    // Obtener los datos del servicio
    const results = await reportService.getReportData(startDate, endDate);

    // Enviar la respuesta
    return res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error al obtener el informe:", error);
    res.status(500).json({ error: "Error al generar el informe" });
  }
};

module.exports = { getReport };
