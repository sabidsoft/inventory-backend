const {
    createStockService,
    getStocksService,
    getStockService,
    updateStockService,
    deleteStockService
} = require("../services/stock.service");

exports.createStockController = async (req, res) => {
    try {
        const stock = await createStockService(req.body);

        res.status(200).json({
            success: true,
            message: "Successfully created the stock!",
            data: stock
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getStocksController = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludesFields = ["sort", "page", "limit", "fields"];
        excludesFields.forEach(excludesField => delete filters[excludesField]);

        filters = JSON.stringify(filters);
        filters = filters.replace(/(gt|gte|lt|lte)/g, (value) => "$" + value);
        filters = JSON.parse(filters);

        const queries = {};

        if (req.query.sort) {
            const sort = req.query.sort.split(',').join(' ');
            queries.sorts = sort;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            queries.skip = (parseInt(page) - 1) * parseInt(limit);
            queries.limit = parseInt(limit);
        }

        const stocks = await getStocksService(filters, queries);

        res.status(200).json({
            success: true,
            data: stocks
        });
    }

    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getStockController = async (req, res) => {
    try {
        const stock = await getStockService(req.params.id);

        res.status(200).json({
            success: true,
            data: stock
        });
    }

    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.deleteStockController = async (req, res) => {
    try {
        const result = await deleteStockService(req.params.id);

        if (!result.deletedCount) {
            return res.status(400).json({
                success: false,
                error: "Couldn't delete the stock!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully deleted the stock!",
            data: result
        });
    }

    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.updateStockController = async (req, res) => {
    try {
        const result = await updateStockService(req.params.id, req.body);

        if (result.matchedCount === 0) {
            return res.status(400).json({
                success: false,
                error: "Couldn't find stock with the id!"
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