module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Product",
    {
      pid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      shortDesc: {
        type: DataTypes.STRING(100),
      },
      mainImages: {
        type: DataTypes.STRING(1000),
      },
      desc: {
        type: DataTypes.STRING(500),
      },
      price: {
        type: DataTypes.DECIMAL(14, 4),
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      promotion: {
        type: DataTypes.STRING(100),
      },
      star: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "product",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Shop, {
      foreignKey: "sid",
      onDelete: "CASCADE",
    });
    model.belongsTo(models.Category, {
      foreignKey: "cid",
      onDelete: "CASCADE",
    });
    model.hasMany(models.Comment, {
      foreignKey: "pid",
      onDelete: "CASCADE",
    });
    model.hasMany(models.File, {
      foreignKey: "pid",
      onDelete: "CASCADE",
    });
    model.belongsToMany(models.Order, {
      through: "product_order",
      as: "orders",
      foreignKey: "pid",
    });
  };

  return model;
};
