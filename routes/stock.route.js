const authorization = require("../middlewares/authorization");
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    createStockController,
    getStocksController,
    getStockController,
    updateStockController,
    deleteStockController
} = require("../controllers/stock.controller");

router.route("/")
    .post(verifyToken, authorization("admin", "stock-manager"), createStockController)
    .get(getStocksController)

router.route("/:id")
    .get(getStockController)
    .delete(verifyToken, authorization("admin", "stock-manager"), deleteStockController)
    .patch(verifyToken, authorization("admin", "stock-manager"), updateStockController)

module.exports = router;