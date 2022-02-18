const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const shopRoute = require("./shop");
const categoryRoute = require("./category");
const productRoute = require("./product");
const commentRoute = require("./comment");

router.use("/user", userRoute);
router.use("/shop", shopRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);
router.use("/comment", commentRoute);

module.exports = router;
