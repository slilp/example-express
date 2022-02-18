const db = require("../db");
const { Op } = require("sequelize");

const productServices = {
  create: async (addModel) => {
    return await db.Product.create(addModel);
  },
  update: async (id, update) => {
    return await db.Product.update(update, {
      where: { pid: id },
    });
  },
  delete: async (id) => {
    return await db.Product.destroy({
      where: { pid: id },
    });
  },
  findById: async (id) => {
    return await db.Product.findById(id, {
      include: [
        {
          model: db.Category,
          as: "category",
        },
        {
          model: db.Shop,
          as: "shop",
          fields: ["sid", "name"],
        },
      ],
    });
  },
  findByFilter: async (
    { nameFilter, categoryFilter, shopFilter, fromPriceFilter, toPriceFilter },
    { skip, limit }
  ) => {
    return await db.Product.findAndCountAll({
      where: {
        [Op.or]: [
          nameFilter
            ? {
                name: {
                  [Op.iLike]: `%${nameFilter}%`,
                },
              }
            : {},
          categoryFilter
            ? {
                cid: categoryFilter,
              }
            : {},
          shopFilter
            ? {
                sid: shopFilter,
              }
            : {},
          {
            price: {
              [Op.between]: [fromPriceFilter, toPriceFilter],
            },
          },
        ],
      },
      include: [
        {
          model: db.Category,
          as: "category",
        },
        {
          model: db.Shop,
          as: "shop",
        },
      ],
      offset: limit * skip,
      limit: limit,
      order: [["name", "ASC"]],
    });
  },
};

module.exports = productServices;
