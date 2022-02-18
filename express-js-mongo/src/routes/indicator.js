const express = require("express");
const router = express.Router();
const { indicatorController } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], indicatorController.create);
router.put("/:id", [jwtAuthentication], indicatorController.update);
router.get("/search", [jwtAuthentication], indicatorController.findByFilter);
router.get("/", [jwtAuthentication], indicatorController.findAll);

module.exports = router;
