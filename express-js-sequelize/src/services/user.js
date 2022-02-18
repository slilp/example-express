const db = require("../db");
const { Op } = require("sequelize");

const userServices = {
  create: async (addModel) => {
    return await db.User.create(addModel);
  },
  update: async (id, update) => {
    return await db.User.update(update, {
      where: { uid: id },
    });
  },
  delete: async (id) => {
    return await db.User.destroy({
      where: { uid: id },
    });
  },
  findById: async (id) => {
    return await db.User.findById(id);
  },
  findByUsername: async (_username) => {
    return await db.User.findOne({
      where: {
        username: _username,
      },
    });
  },
};

module.exports = userServices;
