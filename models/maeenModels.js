const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Conexión a la base de datos
// Definir el modelo Product (MAEPR)
const Price = sequelize.define(
  "Price",
  {
    KOEN: {
      type: DataTypes.STRING,
      allowNull: false, // Código de entidad
      primaryKey: true,
    },
    TIEN: {
      type: DataTypes.STRING,
      allowNull: false, // Tipo de entidad (cliente / proveedor / ambos)
    },
    RTEN: {
      type: DataTypes.STRING,
      allowNull: false, // Rut de la entidad
    },
    SUEN: {
      type: DataTypes.STRING,
      allowNull: true, // Sucursal de la entidad
    },
    NOKOEN: {
      type: DataTypes.STRING,
      allowNull: false, // Nombre de la entidad
    },
    SIEN: {
      type: DataTypes.STRING,
      allowNull: true, // Sigla de la entidad
    },
    GIEN: {
      type: DataTypes.STRING,
      allowNull: true, // Giro de la entidad
    },
    PAEN: {
      type: DataTypes.STRING,
      allowNull: true, // País de la entidad
    },
    CIEN: {
      type: DataTypes.STRING,
      allowNull: true, // Ciudad de la entidad
    },
    CMEN: {
      type: DataTypes.STRING,
      allowNull: true, // Comuna de la entidad
    },
    DIEN: {
      type: DataTypes.STRING,
      allowNull: true, // Dirección de la entidad
    },
    ZOEN: {
      type: DataTypes.STRING,
      allowNull: true, // Zona de la entidad
    },
    FOEN: {
      type: DataTypes.STRING,
      allowNull: true, // Teléfono de la entidad
    },
    FAEN: {
      type: DataTypes.STRING,
      allowNull: true, // Fax de la entidad
    },
    CNEN: {
      type: DataTypes.STRING,
      allowNull: true, // Contacto de la entidad
    },
    KOFUEN: {
      type: DataTypes.STRING,
      allowNull: true, // Código de funcionario asociado
    },
    LCEN: {
      type: DataTypes.STRING,
      allowNull: true, // Lista de costo asignada
    },
    LVEN: {
      type: DataTypes.STRING,
      allowNull: true, // Lista de precio asignada
    },
    CRSD: {
      type: DataTypes.FLOAT,
      allowNull: true, // Monto de crédito sin documentar
    },
    CRCH: {
      type: DataTypes.FLOAT,
      allowNull: true, // Monto de crédito con cheques
    },
    CRLT: {
      type: DataTypes.FLOAT,
      allowNull: true, // Monto de crédito con letras
    },
    CRPA: {
      type: DataTypes.FLOAT,
      allowNull: true, // Monto de crédito con pagarés
    },
    CRTO: {
      type: DataTypes.FLOAT,
      allowNull: true, // Monto de crédito total
    },
    CREN: {
      type: DataTypes.FLOAT,
      allowNull: true, // Crédito asignado a la entidad
    },
    FEVECREN: {
      type: DataTypes.DATE,
      allowNull: true, // Fecha de vencimiento del crédito asignado
    },
  },
  {
    tableName: "MAEEN", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactiva columnas createdAt y updatedAt
  }
);

module.exports = Price;
