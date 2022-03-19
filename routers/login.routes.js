const {Router} = require("express");
const LoginCtrl = require("../controllers/login.controller");

const router = Router();

router.post("/login",LoginCtrl.postLogin);

module.exports = router;