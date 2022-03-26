const {Router} = require("express");
const nominasCtrl = require("../controllers/nominas.controller");

const router = Router();

router.get("/nominas", nominasCtrl.getNomina);
//router.post("/nominas", nominasCtrl.postNomina);
router.post("/nominas", nominasCtrl.postNominaFichero);
router.delete("/nominas", nominasCtrl.delNomina);

module.exports = router;
