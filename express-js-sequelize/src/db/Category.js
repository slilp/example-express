module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Category",
    {
      cid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: "category",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Shop, {
      foreignKey: "sid",
      onDelete: "CASCADE",
    });
    model.hasMany(models.Product, {
      foreignKey: "cid",
      onDelete: "CASCADE",
    });
  };

  return model;
};
