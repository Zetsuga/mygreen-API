const {Router} = require("express");
const superAdminCtrl = require("../controllers/superAdmin.controller");

const router = Router();

router.get("/superAdmin",superAdminCtrl.getSuperAdmin);

module.exports = router;