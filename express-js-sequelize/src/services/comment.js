const db = require("../db");
const { Op } = require("sequelize");

const commentServices = {
  create: async (addModel) => {
    return await db.Comment.create(addModel);
  },
  update: async (id, update) => {
    return await db.Comment.update(update, {
      where: { mid: id },
    });
  },
  delete: async (id) => {
    return await db.Comment.destroy({
      where: { mid: id },
    });
  },
  findById: async (id) => {
    return await db.Comment.findById(id);
  },
  findByProduct: async ({ productFilter }, { skip, limit }) => {
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

module.exports = commentServices;
