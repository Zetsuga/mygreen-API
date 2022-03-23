const {Router} = require("express");
const usuarioFincaCtrl = require("../controllers/usuarioFinca.controller");

const router = Router();

router.post("/usuarioFinca",usuarioFincaCtrl.postUsuarioFinca);

module.exports = router;