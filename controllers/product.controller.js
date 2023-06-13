const {
    getProductsService,
    createProductService,
    updateProductService,
    bulkUpdateProductService,
    deleteProductService,
    bulkDeleteProductService
} = require("../services/product.service");

exports.createProductController = async (req, res) => {
    try {
        const product = await createProductService(req.body);

        res.status(200).json({
            success: true,
            message: "Successfully added the product!",
            data: product
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getProductsController = async (req, res) => {
    try {
        const { page, limit, sort, field } = req.query;

        let filters = { ...req.query };
        const fields = ["page", "limit", "sort", "field"];
        fields.forEach(field => delete filters[field]);

        filters = JSON.stringify(filters);
        filters = filters.replace(/(gt|gte|lt|lte)/g, (value) => "$" + value);
        filters = JSON.parse(filters);

        const queries = {
            page: 1,
            limit: 10
        };

        if (page) queries.page = parseInt(page);
        if (limit) queries.limit = parseInt(limit);
        if (sort) queries.sort = sort.split(',').join(' ');
        if (field) queries.field = field.split(',').join(' ');

        const result = await getProductsService(filters, queries);

        res.status(200).json({
            success: true,
            pagination: result.pagination,
            data: result.products
        });
    }

    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.updateProductController = async (req, res) => {
    try {
        const result = await updateProductService(req.params.id, req.body);

        if (result.matchedCount === 0) {
            return res.status(400).json({
                success: false,
                error: "Failed to update the product!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated the product!"
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.bulkUpdateProductController = async (req, res) => {
    try {
        const result = await bulkUpdateProductService(req.body);

        res
            .status(200)
            .json({
                success: true,
                message: "Successfully updated the products!"
            });
    }
    catch (err) {
        res
            .status(400)
            .json({
                success: false,
                error: err.message
            });
    }
}

exports.deleteProductController = async (req, res) => {
    try {
        const result = await deleteProductService(req.params.id);

        if (!result.deletedCount) {
            return res.status(400).json({
                success: false,
                error: "Couldn't delete the product!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted the product!"
        });
    }
    catch (err) {
        res
            .status(400)
            .json({
                success: false,
                error: err.message
            });
    }
}

exports.bulkDeleteProductController = async (req, res) => {
    try {
        const result = await bulkDeleteProductService(req.body.ids);

        if (!result.deletedCount) {
            return res.status(400).json({
                success: false,
                error: "Couldn't delete the products!"
            });
        }

        res
            .status(200)
            .json({
                success: true,
                message: "Successfully deleted the products!"
            });
    }
    catch (err) {
        res
            .status(400)
            .json({
                success: false,
                error: err.message
            });
    }
}