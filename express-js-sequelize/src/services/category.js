const db = require("../db");
const { Op } = require("sequelize");

const categoryServices = {
  create: async (addModel) => {
    return await db.Category.create(addModel);
  },
  update: async (id, update) => {
    return await db.Category.update(update, {
      where: { cid: id },
    });
  },
  delete: async (id) => {
    return await db.Category.destroy({
      where: { cid: id },
    });
  },
  findById: async (id) => {
    return await db.Category.findById(id);
  },
  findByFilter: async ({ nameFilter }, { skip, limit }) => {
    return await db.Category.findAndCountAll({
      where: {
        name: nameFilter
          ? {
              [Op.iLike]: `%${nameFilter}%`,
            }
          : {},
      },
      offset: limit * skip,
      limit: limit,
      order: [["name", "ASC"]],
    });
  },
};

module.exports = categoryServices;
