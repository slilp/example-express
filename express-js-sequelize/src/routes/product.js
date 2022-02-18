const express = require("express");
const router = express.Router();
const { productControllers } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], productControllers.create);
router.put("/:id", [jwtAuthentication], productControllers.update);
router.delete("/:id", [jwtAuthentication], productControllers.delete);
router.get("/:id", [jwtAuthentication], productControllers.findById);
router.get("/search", [jwtAuthentication], productControllers.findByFilter);

module.exports = router;
