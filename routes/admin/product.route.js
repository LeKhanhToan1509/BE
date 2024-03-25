const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

const product = require("../../controller/admin/product.controller");
router.get("/", product.product);
router.patch("/change-status/:status/:id", product.changeStatus);
router.patch("/change-multi", product.multiChangeStatus);
router.patch("/delete-product/:id", product.deleteProduct);
router.get("/create", product.create);
router.post("/create", upload.single("img"), product.createProduct);
module.exports = router;
