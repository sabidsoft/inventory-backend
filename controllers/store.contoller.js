const {
    createStoreService,
    getStoresService,
    getStoreService
} = require("../services/store.service");

exports.createStoreController = async (req, res) => {
    try {
        const store = await createStoreService(req.body);

        res.status(200).json({
            success: true,
            data: store
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getStoresController = async (req, res) => {
    try {
        const stores = await getStoresService();

        res.status(200).json({
            success: true,
            data: stores
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.getStoreController = async (req, res) => {
    try {
        const store = await getStoreService(req.params.id);

        if (store === null) {
            return res.status(400).json({
                success: false,
                error: "Couldn't find store with this id!"
            })
        }

        res.status(200).json({
            success: true,
            data: store
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}