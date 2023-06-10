const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const authorization = require("../middlewares/authorization");
const {
    getProductsController,
    createProductController,
    updateProductController,
    deleteProductController,
    bulkUpdateProductController,
    bulkDeleteProductController
} = require("../controllers/product.controller");

router.route("/")
    .get(getProductsController)
    .post(verifyToken, authorization("admin", "stock-manager"), createProductController)

router.route("/bulk-update").patch(verifyToken, authorization("admin"), bulkUpdateProductController);
router.route("/bulk-delete").delete(verifyToken, authorization("admin"), bulkDeleteProductController);

router.route("/:id")
    .patch(verifyToken, authorization("admin"), updateProductController)
    .delete(verifyToken, authorization("admin"), deleteProductController)

module.exports = router;