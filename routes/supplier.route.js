const router = require("express").Router();
const authorization = require("../middlewares/authorization");
const verifyToken = require("../middlewares/verifyToken");
const {
    createSupplierController,
    getSuppliersController,
    getSupplierController,
    updateSupplierController
} = require("../controllers/supplier.controller");

router.route("/")
    .post(verifyToken, authorization("admin"), createSupplierController)
    .get(getSuppliersController)

router.route("/:id")
    .get(getSupplierController)
    .patch(verifyToken, authorization("admin"), updateSupplierController)

module.exports = router;