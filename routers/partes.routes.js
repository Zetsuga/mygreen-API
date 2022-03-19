const {Router} = require("express");
const PartesCtrl = require("../controllers/partes.controller");

const router = Router();

router.get("/tareas",PartesCtrl);

module.exports = router;