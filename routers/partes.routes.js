const {Router} = require("express");
const PartesCtrl = require("../controllers/partes.controller");

const router = Router();

router.get("/tareas",PartesCtrl.getTarea);
router.post("/tareas",PartesCtrl.postTarea);
router.put("/tareas",PartesCtrl.putTarea);
router.delete("/tareas",PartesCtrl.delTarea);

module.exports = router;