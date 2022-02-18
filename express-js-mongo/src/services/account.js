const { accountModel, walletModel } = require("../db");

const accountServices = {
  create: async (addModel) => {
    addModel.role = "61594a19c807537bb6405632";
    return await accountModel.create(addModel);
  },
  update: async (id, update) => {
    return await accountModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  findById: async (id) => {
    return await accountModel.findById(id).populate("role");
  },
  findByUsername: async (user) => {
    return await accountModel.findOne({ username: user }).populate("role");
  },
  findWalletsAccount: async (id) => {
    return await accountModel.findById(id).select({ wallets: 1 });
  },
  delete: async (id) => {
    try {
      const session = await walletModel.startSession();
      session.startTransaction();
      const countWalletDelete = await walletModel.deleteMany({ account: id });
      const countAccountDelete = await accountModel.deleteOne({ _id: id });
      await session.commitTransaction();
      session.endSession();
      return { countWalletDelete, countAccountDelete };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
};

module.exports = accountServices;
