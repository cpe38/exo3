const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
// CREATE
// Crée un objet Thing avec les infos du body
router.post("/", auth, multer, stuffCtrl.createOneThing);

// GET
// Liste tous les Things
router.get("/", /*auth,*/ stuffCtrl.getAllThings);
// Récupère un Thing spécifique pointé avec un 'id'
router.get("/:id", auth, stuffCtrl.getOneThing);

// UPDATE
// Modifie un Thing identifié avec son id
router.put("/:id", auth, multer, stuffCtrl.updateOneThing);

// DELETE
// Supprime un objet Thing identifié par son id
router.delete("/:id", auth, stuffCtrl.deleteOneThing);

module.exports = router;
