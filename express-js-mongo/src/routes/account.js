const express = require("express");
const router = express.Router();
const { accountController } = require("../controllers");
const { jwtAuthentication } = require("../middleware/auth");

router.get("/", [jwtAuthentication], accountController.info);
router.post("/register", accountController.register);
router.post("/login", accountController.login);
router.delete("/", [jwtAuthentication], accountController.delete);

module.exports = router;
