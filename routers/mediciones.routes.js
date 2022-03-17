const {Router} = require("express");
const MedicionesCtrl = require("../controllers/mediciones.controller");

const router = Router();

router.get("/mediciones",MedicionesCtrl.getMediciones);

router.get("/insertar",MedicionesCtrl.postMediciones);

module.exports = router;