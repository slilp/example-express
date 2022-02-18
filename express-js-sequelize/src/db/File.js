module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "File",
    {
      fid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      ref: {
        type: DataTypes.STRING(1000),
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "file",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.Product, {
      foreignKey: "pid",
      onDelete: "CASCADE",
    });
  };

  return model;
};
