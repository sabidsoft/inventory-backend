const Store = require("../models/Store");

exports.createStoreService = async (data) => {
    const result = await Store.create(data);
    return result;
}

exports.getStoresService = async () => {
    const result = await Store.find({});
    return result;
}

exports.getStoreService = async (id) => {
    const result = await Store.findOne({ _id: id });
    return result;
}