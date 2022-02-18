const { indicatorServices } = require("../services");

module.exports = {
  create: async (req, res) => {
    const result = await indicatorServices.create(req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    const result = await indicatorServices.update(req.params.id, req.body);
    return res.json(result);
  },
  findAll: async (req, res) => {
    const count = await indicatorServices.countAll();
    const {
      skip = 0,
      limit = 15,
      orderBy = "name",
      orderDirection = "asc",
    } = req.query;

    const query = await indicatorServices.findAll({
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
    } = req.query;

    const count = await indicatorServices.countFindByFilter({
      searchFilter: search,
    });

    const query = await indicatorServices.findByFilter(
      { searchFilter: search },
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
      },
    });
  },
};
