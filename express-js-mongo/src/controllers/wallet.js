const { walletServices, accountServices } = require("../services");

const isWalletInAccount = async (accountId, walletId) => {
  const { wallets } = await accountServices.findWalletsAccount(accountId);
  if (wallets.includes(walletId)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  create: async (req, res) => {
    const account = await accountServices.findById(req.user);
    if (!account) {
      return res.status(404).json({ message: "NOT_FOUND" });
    }
    req.body.account = account._id;
    const result = await walletServices.create(account, req.body);
    return res.json(result);
  },
  update: async (req, res) => {
    if (await isWalletInAccount(req.user, req.body.id)) {
      const result = await walletServices.update(req.body.id, req.body);
      return res.json(result);
    } else {
      return res.status(404).json({ message: "NOT_FOUND" });
    }
  },
  findWalletsByAccount: async (req, res) => {
    const query = await walletServices.findByAccount(req.user);
    return res.json(query);
  },
  info: async (req, res) => {
    if (await isWalletInAccount(req.user, req.params.id)) {
      const query = await walletServices.findById(req.params.id);
      return res.json(query);
    } else {
      return res.status(404).json({ message: "NOT_FOUND" });
    }
  },
  delete: async (req, res) => {
    if (await isWalletInAccount(req.user, req.params.id)) {
      const countWalletDelete = await walletServices.delete(
        req.user,
        req.params.id
      );
      return res.json(countWalletDelete);
    } else {
      return res.status(404).json({ message: "NOT_FOUND" });
    }
  },
};
