const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Conexión a la base de datos

// Definir el modelo Product (MAEPR)
const Product = sequelize.define(
  "Product",
  {
    KOPR: {
      type: DataTypes.STRING,
      primaryKey: true, // Clave primaria (Código principal del producto)
      allowNull: false,
    },
    TIPR: {
      type: DataTypes.STRING, // Tipo de producto
      allowNull: true,
    },
    NOKOPR: {
      type: DataTypes.STRING, // Nombre del producto
      allowNull: false,
    },
    KOPRRA: {
      type: DataTypes.STRING, // Código rápido del producto
      allowNull: true,
    },
    NOKOPRRA: {
      type: DataTypes.STRING, // Nombre rápido del producto
      allowNull: true,
    },
    KOPRTE: {
      type: DataTypes.STRING, // Código técnico del producto
      allowNull: true,
    },
    KOGE: {
      type: DataTypes.STRING, // Código genérico
      allowNull: true,
    },
    NMARCA: {
      type: DataTypes.STRING, // Marca del producto
      allowNull: true,
    },
    UD01PR: {
      type: DataTypes.STRING, // Unidad primaria del producto
      allowNull: true,
    },
    UD02PR: {
      type: DataTypes.STRING, // Unidad secundaria del producto
      allowNull: true,
    },
    RLUD: {
      type: DataTypes.DECIMAL(10, 2), // Relación entre unidades
      allowNull: true,
    },
    POIVPR: {
      type: DataTypes.DECIMAL(5, 2), // Porcentaje de IVA
      allowNull: true,
    },
    NUIMPR: {
      type: DataTypes.INTEGER, // Número de impuestos
      allowNull: true,
    },
    RGPR: {
      type: DataTypes.STRING, // Régimen del producto (nacional/importado)
      allowNull: true,
    },
    STMIPR: {
      type: DataTypes.DECIMAL(10, 2), // Stock mínimo
      allowNull: true,
    },
    STMAPR: {
      type: DataTypes.DECIMAL(10, 2), // Stock máximo
      allowNull: true,
    },
    STFI1: {
      type: DataTypes.DECIMAL(10, 2), // Stock físico unidad primaria
      allowNull: true,
    },
    STDV1: {
      type: DataTypes.DECIMAL(10, 2), // Stock devengado unidad primaria
      allowNull: true,
    },
    STOCNV1: {
      type: DataTypes.DECIMAL(10, 2), // Stock comprometido unidad primaria
      allowNull: true,
    },
    STFI2: {
      type: DataTypes.DECIMAL(10, 2), // Stock físico unidad secundaria
      allowNull: true,
    },
    STDV2: {
      type: DataTypes.DECIMAL(10, 2), // Stock devengado unidad secundaria
      allowNull: true,
    },
    STOCNV2: {
      type: DataTypes.DECIMAL(10, 2), // Stock comprometido unidad secundaria
      allowNull: true,
    },
    PPUL01: {
      type: DataTypes.DECIMAL(15, 2), // Precio última compra unidad primaria
      allowNull: true,
    },
    PPUL02: {
      type: DataTypes.DECIMAL(15, 2), // Precio última compra unidad secundaria
      allowNull: true,
    },
    MOUL: {
      type: DataTypes.STRING, // Moneda última compra
      allowNull: true,
    },
    FEUL: {
      type: DataTypes.DATE, // Fecha última compra
      allowNull: true,
    },
    PM: {
      type: DataTypes.DECIMAL(15, 2), // Precio promedio del producto
      allowNull: true,
    },
    FEPM: {
      type: DataTypes.DATE, // Última fecha de cálculo precio promedio
      allowNull: true,
    },
    FMPR: {
      type: DataTypes.STRING, // Super familia del producto
      allowNull: true,
    },
    PFPR: {
      type: DataTypes.STRING, // Familia del producto
      allowNull: true,
    },
    HFPR: {
      type: DataTypes.STRING, // Subfamilia del producto
      allowNull: true,
    },
    VALI: {
      type: DataTypes.DECIMAL(15, 2), // Valor libro del producto
      allowNull: true,
    },
    FEVALI: {
      type: DataTypes.DATE, // Última fecha cálculo valor libro
      allowNull: true,
    },
    TTREPR: {
      type: DataTypes.INTEGER, // Tiempo de reposición del producto
      allowNull: true,
    },
    PMIN: {
      type: DataTypes.DECIMAL(15, 2), // Precio promedio inicial del producto
      allowNull: true,
    },
    PLANO: {
      type: DataTypes.STRING, // Nombre archivo plano asociado
      allowNull: true,
    },
  },
  {
    tableName: "MAEPR", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactiva columnas createdAt y updatedAt
  }
);

module.exports = Product;
