const express = require("express");
const router = express.Router();
const role = require("../../controller/admin/role.controller.js");
const multer = require("multer");
const upload = multer();

router.get("/", role.index);
router.get("/create", role.create);
router.post("/create", role.createRole);
router.get("/edit/:id", role.editRole);
router.patch("/edit/:id", role.edit);
router.patch("/delete/:id", role.deleteRole);
router.get("/permission", role.permission);
router.patch("/permission", role.updatePermission);
module.exports = router;
