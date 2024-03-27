const express = require("express");
const router = express.Router();
const auth = require("../../controller/admin/auth.controller.js");

router.get("/login", auth.login);
router.post("/login", auth.checkLogin);
router.get("/signup", auth.signup);
router.post("/signup", auth.signupPost);
router.get("/logout", auth.logout);
module.exports = router;
