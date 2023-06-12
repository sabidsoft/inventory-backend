const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");

const {
    createBrandController,
    getBrandsController,
    getBrandController,
    updateBrandController
} = require("../controllers/brand.controller");

router.route("/")
    .get(getBrandsController)
    .post(verifyToken, authorization("admin"), createBrandController)

router.route("/:id")
    .get(getBrandController)
    .patch(verifyToken, authorization("admin"), updateBrandController)

module.exports = router;