const express = require("express");
const router = express.Router();
const accountRoute = require("./account");
const walletRoute = require("./wallet");
const assetRoute = require("./asset");
const indicatorRoute = require("./indicator");
const transactionRoute = require("./transaction");

router.use("/account", accountRoute);
router.use("/wallet", walletRoute);
router.use("/asset", assetRoute);
router.use("/indicator", indicatorRoute);
router.use("/transaction", transactionRoute);

module.exports = router;
