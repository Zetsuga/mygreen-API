const {Router} = require("express");
const MedicionesCtrl = require("../controllers/mediciones.controller");

const router = Router();

router.get("/mediciones",MedicionesCtrl.getMediciones);

router.post("/mediciones",MedicionesCtrl.postMediciones);

module.exports = router;