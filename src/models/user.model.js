module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      uuid: DataTypes.UUIDV4,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: "users",
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Product, { foreignKey: "userId", as: "products" });
  };

  return User;
};
