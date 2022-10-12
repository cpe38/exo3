const express = require("express");
const router = express.Router();
const agentCtrl = require("../controllers/agent");
const auth = require("../middlewares/auth");

router.post("/register", agentCtrl.registerAgent);
router.post("/login", agentCtrl.loginAgent);
router.post("/update", auth, agentCtrl.updateAgent);

module.exports = router;
