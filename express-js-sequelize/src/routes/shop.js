const express = require("express");
const router = express.Router();
const { shopControllers } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], shopControllers.create);
router.put("/:id", [jwtAuthentication], shopControllers.update);
router.delete("/:id", [jwtAuthentication], shopControllers.delete);
router.get("/search", [jwtAuthentication], shopControllers.findByFilter);

module.exports = router;
