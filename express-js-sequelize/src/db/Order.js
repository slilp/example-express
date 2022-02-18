module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Order",
    {
      oid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL(14, 4),
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM("reserve", "paid", "delivering", "delivered"),
        defaultValue: "reserve",
      },
    },
    {
      tableName: "order",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.User, {
      foreignKey: "uid",
      onDelete: "CASCADE",
    });
    model.belongsToMany(models.Product, {
      through: "product_order",
      as: "products",
      foreignKey: "oid",
    });
  };

  return model;
};
