const { Types } = require("mongoose");
const { transactionModel } = require("../db");

const transactionServices = {
  create: async (addModel) => {
    const insertTransaction = await transactionModel.create(addModel);
    // const updateTransaction = await transactionModel.findByIdAndUpdate(
    //   result._id,
    //   {
    //     $set: { wallet: walletId, asset: assetId },
    //     $push: { indicators: indicatorsId },
    //   },
    //   { new: true }
    // );
    return insertTransaction;
  },
  update: async (id, update) => {
    return await transactionModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  findById: async (id) => {
    return await transactionModel
      .findById(id)
      .populate([
        { path: "asset" },
        { path: "wallet" },
        { path: "indicators" },
      ]);
  },
  countAll: async () => {
    return await transactionModel.count();
  },
  findAll: async ({ skip, limit }) => {
    return await transactionModel.find({}).skip(skip).limit(limit);
  },
  delete: async (id) => {
    return await transactionModel.deleteOne({ _id: id });
  },
  countFindByFilter: async ({
    assetFilter,
    walletFilter,
    profitLossFilter,
    fromDateFilter,
    toDateFilter,
    statusFilter,
  }) => {
    return await transactionModel.aggregate([
      {
        $match: {
          $and: [
            assetFilter
              ? {
                  asset: Types.ObjectId(assetFilter),
                }
              : {},
            {
              wallet: Types.ObjectId(walletFilter),
            },
            {
              buyDate: {
                $gte: fromDateFilter,
                $lte: toDateFilter,
              },
            },
            statusFilter
              ? {
                  status: statusFilter,
                }
              : {},
          ],
        },
      },
      {
        $addFields: {
          pl: {
            $subtract: [
              { $multiply: ["$sellPrice", "$amount"] },
              { $multiply: ["$buyPrice", "$amount"] },
            ],
          },
        },
      },
      {
        $match: profitLossFilter
          ? {
              pl: profitLossFilter === "profit" ? { $gte: 0 } : { $lte: 0 },
            }
          : {},
      },
      {
        $count: "count",
      },
    ]);
  },
  findByFilter: async (
    {
      assetFilter,
      walletFilter,
      profitLossFilter,
      fromDateFilter,
      toDateFilter,
      statusFilter,
    },
    { skip, limit }
  ) => {
    return await transactionModel
      .aggregate([
        {
          $match: {
            $and: [
              assetFilter
                ? {
                    asset: Types.ObjectId(assetFilter),
                  }
                : {},
              {
                wallet: Types.ObjectId(walletFilter),
              },
              {
                buyDate: {
                  $gte: fromDateFilter,
                  $lte: toDateFilter,
                },
              },
              statusFilter
                ? {
                    status: statusFilter,
                  }
                : {},
            ],
          },
        },
        {
          $addFields: {
            pl: {
              $subtract: [
                { $multiply: ["$sellPrice", "$amount"] },
                { $multiply: ["$buyPrice", "$amount"] },
              ],
            },
          },
        },
        {
          $match: profitLossFilter
            ? {
                pl: profitLossFilter === "profit" ? { $gte: 0 } : { $lte: 0 },
              }
            : {},
        },
      ])
      .skip(+skip)
      .limit(+limit);
  },
};

module.exports = transactionServices;
