module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "User",
    {
      uid: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(500),
      },
      firstName: {
        type: DataTypes.STRING(100),
      },
      lastName: {
        type: DataTypes.STRING(100),
      },
      profile: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      tableName: "user",
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Comment, {
      foreignKey: "uid",
      onDelete: "CASCADE",
    });
    model.hasMany(models.Order, {
      foreignKey: "uid",
      onDelete: "CASCADE",
    });
  };

  return model;
};
