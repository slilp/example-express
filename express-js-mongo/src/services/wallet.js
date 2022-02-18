const { walletModel, accountModel } = require("../db");

const walletServices = {
  create: async (account, addModel) => {
    const walletInsert = await walletModel.create(addModel);
    account.wallets.push(walletInsert);
    await account.save();
    return walletInsert;
  },
  update: async (id, update) => {
    return await walletModel.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
  },
  findById: async (id) => {
    return await walletModel.findById(id);
  },
  findByAccount: async (accountId) => {
    return await walletModel.find({ account: accountId });
  },
  delete: async (accountId, walletId) => {
    const countWalletDelete = await walletModel.deleteOne({ _id: walletId });
    const accountUpdate = await accountModel.findByIdAndUpdate(accountId, {
      $pull: walletId,
    });

    return countWalletDelete;
  },
};

module.exports = walletServices;
