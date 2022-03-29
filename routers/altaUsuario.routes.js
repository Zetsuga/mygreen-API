const {Router} = require("express");
const AltaUsuarioCtrl = require("../controllers/altaUsuario.controller");

const router = Router();

router.post("/altaUsuario",AltaUsuarioCtrl.enviarCorreo);


module.exports = router;