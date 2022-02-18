const express = require("express");
const router = express.Router();
const { assetController } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], assetController.create);
router.put("/:id", [jwtAuthentication], assetController.update);
router.delete("/:id", [jwtAuthentication], assetController.delete);
router.get("/search", [jwtAuthentication], assetController.findByFilter);
router.get("/", [jwtAuthentication], assetController.findAll);

module.exports = router;
