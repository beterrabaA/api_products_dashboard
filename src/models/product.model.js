module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      data: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      userId: { type: DataTypes.UUID, foreignKey: true },
    },
    {
      timestamps: true,
      tableName: "products",
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: "userId", as: "users" });
  };

  return Product;
};
