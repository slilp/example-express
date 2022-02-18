module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Comment",
    {
      mid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      star: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      tableName: "comment",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.User, {
      foreignKey: "uid",
      onDelete: "CASCADE",
    });
    model.belongsTo(models.Product, {
      foreignKey: "pid",
      onDelete: "CASCADE",
    });
  };

  return model;
};
