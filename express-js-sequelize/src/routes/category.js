const express = require("express");
const router = express.Router();
const { categoryControllers } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.post("/", [jwtAuthentication], categoryControllers.create);
router.put("/:id", [jwtAuthentication], categoryControllers.update);
router.delete("/:id", [jwtAuthentication], categoryControllers.delete);
router.get("/search", [jwtAuthentication], categoryControllers.findByFilter);

module.exports = router;
