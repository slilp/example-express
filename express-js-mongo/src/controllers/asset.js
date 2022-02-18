const { assetServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await assetServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await assetServices.update(req.params.id, req.body);
    return res.json(result);
  },
  delete: async (req, res) => {
    const result = await assetServices.delete(req.params.id);
    return res.json(result);
  },
  findAll: async (req, res) => {
    const count = await assetServices.countAll();
    const {
      skip = 0,
      limit = 15,
      orderBy = "name",
      orderDirection = "asc",
    } = req.query;
    const query = await assetServices.findAll({
      skip: skip,
      limit: limit,
      orderBy: {
        [orderBy]: orderDirection,
      },
    });
    return res.json({
      totalRecord: count,
      skip: skip,
      limit: limit,
      data: query,
    });
  },
  findByFilter: async (req, res) => {
    const {
      skip = 0,
      limit = 15,
      orderBy = "name",
      orderDirection = "asc",
      search,
      type,
    } = req.query;

    const count = await assetServices.countFindByFilter({
      searchFilter: search,
      typeFilter: type,
    });

    if (count === 0) return res.status(404).json({ message: "NOT_FOUND" });

    const query = await assetServices.findByFilter(
      { searchFilter: search, typeFilter: type },
      {
        skip: skip,
        limit: limit,
        orderBy: {
          [orderBy]: orderDirection,
        },
      }
    );
    return res.json({
      totalRecord: count,
      skip: skip,
      limit: limit,
      data: query,
      filter: {
        search: search,
        type: type,
      },
    });
  },
};
