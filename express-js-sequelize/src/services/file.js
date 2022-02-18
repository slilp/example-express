const db = require("../db");
const { Op } = require("sequelize");

const fileServices = {
  create: async (addModels) => {
    return await db.File.bulkCreate(addModels);
  },
  update: async (id, update) => {
    return await db.File.update(update, {
      where: { fid: id },
    });
  },
  delete: async (ids) => {
    return await db.Category.destroy({
      where: { fid: ids },
    });
  },
  findByFilter: async ({ productFilter }, { skip, limit }) => {
    return await db.File.findAndCountAll({
      where: {
        pid: productFilter,
      },
      offset: limit * skip,
      limit: limit,
      order: [["order", "DESC"]],
    });
  },
};

module.exports = fileServices;
