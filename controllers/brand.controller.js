const {
    createBrandService,
    getBrandsService,
    getBrandService,
    updateBrandService
} = require("../services/brand.service");

exports.createBrandController = async (req, res) => {
    try {
        const brand = await createBrandService(req.body);
        res.status(200).json({
            success: true,
            data: brand
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getBrandsController = async (req, res) => {
    try {
        const brands = await getBrandsService();
        res.status(200).json({
            success: true,
            data: brands
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getBrandController = async (req, res) => {
    try {
        const brand = await getBrandService(req.params.id);

        if (brand === null) {
            return res.status(400).json({
                success: false,
                error: "Couldn't find brand with this id!"
            })
        }

        res.status(200).json({
            success: true,
            data: brand
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.updateBrandController = async (req, res) => {
    try {
        const result = await updateBrandService(req.params.id, req.body);

        if (result.matchedCount === 0) {
            return res.status(400).json({
                success: false,
                error: "Failed to update the brand!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Brand updated successfully!"
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}