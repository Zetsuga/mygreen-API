const {Router} = require("express");
const fincaCtrl = require("../controllers/finca.controller");

const router = Router();

router.get("/finca",fincaCtrl.getFinca);
router.post("/finca",fincaCtrl.postFinca);
router.put("/finca",fincaCtrl.putFinca);
router.delete("/finca",fincaCtrl.delFinca);

module.exports = router;