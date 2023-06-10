const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/avatar");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const uploader = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        if (/jpg|jpeg|png/.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Avatar must be a jpg/jpeg/png image!"));
        }
    },

    limits: {
        fileSize: 5000000
    }
})

module.exports = uploader;