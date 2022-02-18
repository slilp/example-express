module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Shop",
    {
      sid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      desc: {
        type: DataTypes.STRING(500),
      },
      logo: {
        type: DataTypes.STRING(1000),
      },
      background: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      tableName: "shop",
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Category, {
      foreignKey: "sid",
      onDelete: "CASCADE",
    });
    model.hasMany(models.Product, {
      foreignKey: "sid",
      onDelete: "CASCADE",
    });
  };

  return model;
};
