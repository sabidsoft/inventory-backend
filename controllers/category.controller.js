const {
    createCategoryService,
    getCategoriesService
} = require("../services/category.service");

exports.createCategoryController = async (req, res) => {
    try {
        const category = await createCategoryService(req.body);

        res.status(200).json({
            success: true,
            data: category
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategoriesService();

        res.status(200).json({
            success: true,
            data: categories
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}