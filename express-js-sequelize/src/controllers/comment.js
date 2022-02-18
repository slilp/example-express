const { commentServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await commentServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await commentServices.update(req.params.id, req.body);
    return res.json(result);
  },
  delete: async (req, res) => {
    const result = await commentServices.delete(req.params.id);
    return res.json(result);
  },
  findById: async (req, res) => {
    const result = await commentServices.findById(req.params.id);
    return res.json(result);
  },
  findByFilter: async (req, res) => {
    const { skip = 0, limit = 15, product } = req.query;
    const { count, rows } = await commentServices.findByFilter(
      {
        productFilter: product,
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
        product: product,
      },
    });
  },
};
