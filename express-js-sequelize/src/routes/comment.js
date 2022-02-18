const express = require("express");
const router = express.Router();
const { commentControllers } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], commentControllers.create);
router.put("/:id", [jwtAuthentication], commentControllers.update);
router.delete("/:id", [jwtAuthentication], commentControllers.delete);
router.get("/:id", [jwtAuthentication], commentControllers.findById);
router.get("/search", [jwtAuthentication], commentControllers.findByFilter);

module.exports = router;
