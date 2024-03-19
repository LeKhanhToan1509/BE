const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/products.controller");
router.get("/", controller.index);

router.get("/edit", controller.edit);
router.get("/delete", controller.delete);
router.get("/create", controller.create);

module.exports = router;
