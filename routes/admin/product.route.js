const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
    cloud_name: "dmuqjiicj",
    api_key: "591678231237736",
    api_secret: "ti_Ex9kwg9VpMuAE8r3CauFByng",
});

const product = require("../../controller/admin/product.controller");
router.get("/", product.product);
router.patch("/change-status/:status/:id", product.changeStatus);
router.patch("/change-multi", product.multiChangeStatus);
router.patch("/delete-product/:id", product.deleteProduct);
router.get("/create", product.create);
router.post(
    "/create",
    upload.single("img"),
    function (req, res, next) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            req.body.image = result.url;
        }
        upload(req).then(() => {
            next();
        });
    },
    product.createProduct
);
module.exports = router;
