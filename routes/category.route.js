const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();
const authorization = require("../middlewares/authorization");

const {
    createCategoryController,
    getCategoriesController
} = require("../controllers/category.controller");

router.route("/")
    .post(verifyToken, authorization("admin"), createCategoryController)
    .get(getCategoriesController)

module.exports = router;