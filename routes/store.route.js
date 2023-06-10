const router = require("express").Router();
const authorization = require("../middlewares/authorization");
const verifyToken = require("../middlewares/verifyToken");
const {
    createStoreController,
    getStoresController,
    getStoreController
} = require("../controllers/Store.contoller");

router.route("/")
    .post(verifyToken, authorization("admin"), createStoreController)
    .get(getStoresController)

router.route("/:id")
    .get(getStoreController)

module.exports = router;