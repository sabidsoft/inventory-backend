const {
    createSupplierService,
    getSuppliersService,
    getSupplierService,
    updateSupplierService
} = require("../services/supplier.service");

exports.createSupplierController = async (req, res) => {
    try {
        const supplier = await createSupplierService(req.body);

        res.status(200).json({
            success: true,
            data: supplier
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getSuppliersController = async (req, res) => {
    try {
        const suppliers = await getSuppliersService();

        res.status(200).json({
            success: true,
            data: suppliers
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getSupplierController = async (req, res) => {
    try {
        const supplier = await getSupplierService(req.params.id);

        if (supplier === null) {
            return res.status(400).json({
                success: false,
                error: "Couldn't find supplier with this id!"
            })
        }

        res.status(200).json({
            success: true,
            data: supplier
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.updateSupplierController = async (req, res) => {
    try {
        const result = await updateSupplierService(req.params.id, req.body);

        if (result.matchedCount === 0) {
            return res.status(400).json({
                success: false,
                error: "Failed to update the brand!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Supplier updated successfully!",
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