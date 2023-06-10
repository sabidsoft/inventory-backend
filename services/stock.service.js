const Stock = require("../models/Stock");

exports.createStockService = async (data) => {
    const stock = await Stock.create(data);
    return stock;
}

exports.getStocksService = async (filters, queries) => {
    const stocks = await Stock
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(queries.sorts)
        .select(queries.fields)

    // // aggregation
    // const stocks = await Stock.aggregate([
    //     {
    //         $match: {}
    //     },
    //     {
    //         $project: {
    //             store: 1,
    //             quantity: 1,
    //             price: { $convert: { input: "$price", to: "int" } },
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$store.name",
    //             totalProductsPrice: {
    //                 $sum: {
    //                     $multiply: ["$price", "$quantity"]
    //                 }
    //             }
    //         }
    //     }
    // ])

    const total = await Stock.countDocuments(filters);
    const page = Math.ceil(total / queries.limit)

    return { total, page, stocks };
}

exports.getStockService = async (id) => {
    const stock = await Stock.findOne({ _id: id })
        .populate("brand.id")
        .populate("store.id")
        .populate("supplier.id")

    return stock;

    // // aggregation
    // const stock = await Stock.aggregate([
    //     {
    //         $match: {
    //             _id: new ObjectId(id)
    //         }
    //     },
    //     {
    //         $project: {
    //             projectId: 1,
    //             name: 1,
    //             price: 1,
    //             brand: 1,
    //             categories: 1,
    //             quantity: 1,
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "brands",
    //             localField: "brand.name",
    //             foreignField: "name",
    //             as: "brandDetails",
    //         }
    //     }
    // ])
    // return stock;
}

exports.deleteStockService = async (id) => {
    const result = await Stock.deleteOne({ _id: id });
    return result;
}

exports.updateStockService = async (id, data) => {
    const result = await Stock.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    return result;
}