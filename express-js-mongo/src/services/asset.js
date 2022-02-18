const { assetModel } = require("../db");

const assetServices = {
  create: async (addModel) => {
    return await assetModel.create(addModel);
  },
  update: async (id, update) => {
    return await assetModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  findById: async (id) => {
    return await assetModel.findById(id);
  },
  countAll: async () => {
    return await assetModel.count();
  },
  findAll: async ({ skip, limit, orderBy }) => {
    return await assetModel
      .find({})
      .sort(orderBy)
      .skip(+skip)
      .limit(+limit);
  },
  delete: async (id) => {
    return await assetModel.deleteOne({ _id: id });
  },
  countFindByFilter: async ({ searchFilter, typeFilter }) => {
    return await assetModel
      .find({
        $and: [
          typeFilter
            ? {
                type: typeFilter,
              }
            : {},
          searchFilter
            ? {
                $or: [
                  { name: { $regex: searchFilter, $options: "i" } },
                  { symbol: { $regex: searchFilter, $options: "i" } },
                ],
              }
            : {},
        ],
      })
      .count();
  },
  findByFilter: async (
    { searchFilter, typeFilter },
    { skip, limit, orderBy }
  ) => {
    return await assetModel
      .find({
        $and: [
          typeFilter
            ? {
                type: typeFilter,
              }
            : {},
          searchFilter
            ? {
                $or: [
                  { name: { $regex: searchFilter, $options: "i" } },
                  { symbol: { $regex: searchFilter, $options: "i" } },
                ],
              }
            : {},
        ],
      })
      .sort(orderBy)
      .skip(+skip)
      .limit(+limit);
  },
};

module.exports = assetServices;
