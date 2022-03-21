const {Router} = require("express");
const incidenciaCtrl = require("../controllers/incidencias.controller");


const router = Router();

router.get("/incidencia",incidenciaCtrl.getIncidencias);
router.post("/incidencia",incidenciaCtrl.postIncidencia);
router.put("/incidencia",incidenciaCtrl.putIncidencia);
router.delete("/incidencia",incidenciaCtrl.delIncidencia);

module.exports = router;