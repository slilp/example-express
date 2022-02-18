const express = require("express");
const router = express.Router();
const { userControllers } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.get("/", [jwtAuthentication], userControllers.info);
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.delete("/", [jwtAuthentication], userControllers.delete);

module.exports = router;
