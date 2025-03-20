const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Conexión a la base de datos

const Maeedo = sequelize.define(
  "Maeedo",
  {
    IDMAEEDO: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Clave primaria
      allowNull: false,
    },
    EMPRESA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TIDO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NUDO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ENDO: {
      type: DataTypes.STRING,
    },
    SUENDO: {
      type: DataTypes.STRING,
    },
    ENDOFI: {
      type: DataTypes.STRING,
    },
    TIGEDO: {
      type: DataTypes.STRING,
    },
    SUDO: {
      type: DataTypes.STRING,
    },
    LUVTDO: {
      type: DataTypes.STRING,
    },
    FEEMDO: {
      type: DataTypes.DATE,
    },
    KOFUDO: {
      type: DataTypes.STRING,
    },
    ESDO: {
      type: DataTypes.STRING,
    },
    ESPGDO: {
      type: DataTypes.STRING,
    },
    CAPRCO: {
      type: DataTypes.FLOAT,
    },
    CAPRAD: {
      type: DataTypes.FLOAT,
    },
    CAPREX: {
      type: DataTypes.FLOAT,
    },
    CAPRNC: {
      type: DataTypes.FLOAT,
    },
    MEARDO: {
      type: DataTypes.STRING,
    },
    MODO: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "MAEEDO", // Nombre de la tabla
    timestamps: false, // No hay columnas createdAt y updatedAt
  }
);

module.exports = Maeedo;
