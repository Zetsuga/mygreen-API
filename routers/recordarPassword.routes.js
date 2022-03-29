const {Router} = require("express");
const RecordarCtrl = require("../controllers/recordarPassword.controller");

const router = Router();

router.post("/recordar",RecordarCtrl.recordarContrasenia);


module.exports = router;