const express = require("express");
const router = express.Router();
const account = require("../../controller/admin/account.controller.js");
const multer = require("multer");
const upload = multer();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
    cloud_name: "dmuqjiicj",
    api_key: "591678231237736",
    api_secret: "ti_Ex9kwg9VpMuAE8r3CauFByng",
});

router.get("/", account.index);
router.get("/create", account.create);
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
    account.createAccount
);
router.get("/edit/:id", account.edit);
router.patch(
    "/edit/:id",
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
            if (req.file) {
                let result = await streamUpload(req);
                req.body.image = result.url;
            }
            else{
                req.body.image = 'not change';  
            }
        }
        upload(req).then(() => {
            next();
        });
    },
    account.editAccount
);
router.patch("/delete/:id", account.deleteAccount);
module.exports = router;
