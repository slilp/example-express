const { indicatorModel } = require("../db");

const indicatorServices = {
  create: async (addModel) => {
    return await indicatorModel.create(addModel);
  },
  update: async (id, update) => {
    return await indicatorModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  findById: async (id) => {
    return await indicatorModel.findById(id);
  },
  countAll: async () => {
    return await indicatorModel.count();
  },
  findAll: async ({ skip, limit, orderBy }) => {
    return await indicatorModel.find({}).sort(orderBy).skip(skip).limit(limit);
  },
  countFindByFilter: async ({ searchFilter }) => {
    return await indicatorModel
      .find(
        searchFilter
          ? {
              $or: [
                { name: { $regex: searchFilter, $options: "i" } },
                { symbol: { $regex: searchFilter, $options: "i" } },
              ],
            }
          : {}
      )
      .count();
  },
  findByFilter: async ({ searchFilter }, { skip, limit, orderBy }) => {
    return await indicatorModel
      .find(
        searchFilter
          ? {
              $or: [
                { name: { $regex: searchFilter, $options: "i" } },
                { symbol: { $regex: searchFilter, $options: "i" } },
              ],
            }
          : {}
      )
      .sort(orderBy)
      .skip(skip)
      .limit(limit);
  },
};

module.exports = indicatorServices;
