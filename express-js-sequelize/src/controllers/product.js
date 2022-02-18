const { productServices, fileServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await productServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await productServices.update(req.params.id, req.body);
    return res.json(result);
  },
  delete: async (req, res) => {
    const result = await productServices.delete(req.params.id);
    return res.json(result);
  },
  findById: async (req, res) => {
    const info = await productServices.findById(req.params.id);
    const images = await fileServices.findByFilter(req.params.id);
    return res.json({
      productInfo: info,
      productImage: images,
    });
  },
  findByFilter: async (req, res) => {
    const {
      skip = 0,
      limit = 15,
      name,
      category,
      shop,
      fromPrice = Number.MIN_VALUE,
      toPrice = Number.MAX_VALUE,
    } = req.query;
    const { count, rows } = await productServices.findByFilter(
      {
        nameFilter: name,
        categoryFilter: category,
        shopFilter: shop,
        fromPriceFilter: fromPrice,
        toPriceFilter: toPrice,
      },
      {
        skip: skip,
        limit: limit,
      }
    );
    return res.json({
      totalRecord: count,
      skip: skip,
      limit: limit,
      data: rows,
      filter: {
        name: name,
        category: category,
        shop: shop,
        fromPrice: fromPrice,
        toPrice: toPrice,
      },
    });
  },
};
