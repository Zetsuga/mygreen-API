const {Router} = require("express");
const usuarioCtrl = require("../controllers/usuario.controller");

const router = Router();

router.get("/usuario",usuarioCtrl.getUsuario);
router.post("/usuario",usuarioCtrl.postUsuario);
router.put("/usuario",usuarioCtrl.putUsuario);
router.delete("/usuario",usuarioCtrl.delUsuario);

module.exports = router;