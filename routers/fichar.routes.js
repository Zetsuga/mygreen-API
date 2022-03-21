const {Router} = require("express");
const FicharCtrl = require("../controllers/fichar.controller");

const router = Router();

router.get("/fichar",FicharCtrl.getFichar);
router.post("/fichar",FicharCtrl.postFichar);
router.put("/fichar",FicharCtrl.putFichar);


module.exports = router;