const express = require("express");
const router = express.Router();
const chat = require("../../controller/admin/chat.controller");

router.get("/", chat.index);

module.exports = router;
