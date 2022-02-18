const { categoryServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await categoryServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await categoryServices.update(req.params.id, req.body);
    return res.json(result);
  },
  delete: async (req, res) => {
    const result = await categoryServices.delete(req.params.id);
    return res.json(result);
  },
  findByFilter: async (req, res) => {
    const { skip = 0, limit = 15, name } = req.query;
    const { count, rows } = await categoryServices.findByFilter(
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
