const { shopServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await shopServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await shopServices.update(req.params.id, req.body);
    return res.json(result);
  },
  delete: async (req, res) => {
    const result = await shopServices.delete(req.params.id);
    return res.json(result);
  },
  findByFilter: async (req, res) => {
    const { skip = 0, limit = 15, name } = req.query;
    const { count, rows } = await shopServices.findByFilter(
      {
        nameFilter: name,
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
      },
    });
  },
};
