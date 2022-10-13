const express = require("express");
const router = express.Router();
const exampleCtrl = require("../controllers/example");

router.get("/", exampleCtrl.getAllThings);
router.get("/intervention", exampleCtrl.getAllInterventions);

module.exports = router;
