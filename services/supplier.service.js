const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
    const supplier = await Supplier.create(data);
    return supplier;
}

exports.getSuppliersService = async () => {
    const suppliers = await Supplier.find({});
    return suppliers;
}

exports.getSupplierService = async (id) => {
    const supplier = await Supplier.findOne({ _id: id });
    return supplier;
}

exports.updateSupplierService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    return result;
}