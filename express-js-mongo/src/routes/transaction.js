const express = require("express");
const router = express.Router();
const { transactionController } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], transactionController.create);
router.put("/:id", [jwtAuthentication], transactionController.update);
router.delete("/:id", [jwtAuthentication], transactionController.delete);
router.get(
  "/search/:id",
  [jwtAuthentication],
  transactionController.findByFilter
);
router.get("/info", [jwtAuthentication], transactionController.findById);

module.exports = router;
