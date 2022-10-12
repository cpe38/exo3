const express = require("express");
const router = express.Router();
const interventionCtrl = require("../controllers/intervention");
const auth = require("../middlewares/auth");

router.post("/", auth, interventionCtrl.addIntervention);
router.get("/", auth, interventionCtrl.getIntervention);
router.get("/all", interventionCtrl.getAllIntervention);
router.delete("/:id", auth, interventionCtrl.deleteIntervention);

module.exports = router;
