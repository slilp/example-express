const express = require("express");
const router = express.Router();
const { walletController } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], walletController.create);
router.put("/", [jwtAuthentication], walletController.update);
router.delete("/:id", [jwtAuthentication], walletController.delete);
router.get(
  "/findWalletsByAccount",
  [jwtAuthentication],
  walletController.findWalletsByAccount
);
router.get("/info/:id", [jwtAuthentication], walletController.info);

module.exports = router;
