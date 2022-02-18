const db = require("../db");
const { Op } = require("sequelize");

const shopServices = {
  create: async (addModel) => {
    return await db.Shop.create(addModel);
  },
  update: async (id, update) => {
    return await db.Shop.update(update, {
      where: { sid: id },
    });
  },
  delete: async (id) => {
    return await db.Shop.destroy({
      where: { sid: id },
    });
  },
  findById: async (id) => {
    return await db.Shop.findById(id);
  },
  findByFilter: async ({ nameFilter }, { skip, limit }) => {
    return await db.Shop.findAndCountAll({
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

module.exports = shopServices;
