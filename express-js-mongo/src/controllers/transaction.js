const { transactionServices, accountServices } = require("../services");

const isWalletInAccount = async (accountId, walletId) => {
  const { wallets } = await accountServices.findWalletsAccount(accountId);
  if (wallets.includes(walletId)) {
    return true;
  } else {
    return false;
  }
};

const maxDate = new Date(8640000000000000);
const minDate = new Date(-8640000000000000);

module.exports = {
  create: async (req, res) => {
    if (await isWalletInAccount(req.user, req.body.wallet)) {
      req.body.status = "waiting";
      const result = await transactionServices.create(req.body);
      return res.json(result);
    }
    return res.status(404).json({ message: "NOT_FOUND" });
  },
  update: async (req, res) => {
    const result = await transactionServices.update(req.params.id, req.body);
    return res.json(result);
  },
  delete: async (req, res) => {
    const result = await transactionServices.delete(req.params.id);
    return res.json(result);
  },
  findById: async (req, res) => {
    const result = await transactionServices.findById(req.body.id);
    return res.json(result);
  },
  findByFilter: async (req, res) => {
    if (await isWalletInAccount(req.user, req.params.id)) {
      let {
        skip = 0,
        limit = 15,
        asset,
        pl,
        fromDate,
        toDate,
        status,
      } = req.query;
      if (!fromDate) fromDate = minDate;
      if (!toDate) toDate = maxDate;

      const count = await transactionServices.countFindByFilter({
        assetFilter: asset,
        walletFilter: req.params.id,
        profitLossFilter: pl,
        statusFilter: status,
        fromDateFilter: fromDate,
        toDateFilter: toDate,
      });
      if (count.length === 0)
        return res.status(404).json({ message: "NOT_FOUND" });

      const query = await transactionServices.findByFilter(
        {
          assetFilter: asset,
          walletFilter: req.params.id,
          profitLossFilter: pl,
          statusFilter: status,
          fromDateFilter: fromDate,
          toDateFilter: toDate,
        },
        {
          skip: skip,
          limit: limit,
        }
      );
      return res.json({
        totalRecord: count[0].count,
        skip: skip,
        limit: limit,
        data: query,
        filter: {
          asset: asset,
          profitLoss: pl,
        },
      });
    }
    return res.status(404).json({ message: "NOT_FOUND" });
  },
};
