const Product = require("../models/Product");
const Brand = require("../models/Brand");

exports.createProductService = async (data) => {
    const product = await Product.create(data);
    await Brand.updateOne({ _id: product.brand.id }, { $push: { products: product._id } });

    return product;
}

exports.getProductsService = async (filters, queries) => {
    const { page, skip, limit, sorts, fields } = queries;

    const products = await Product
        .find(filters)
        .skip(skip)
        .limit(limit)
        .sort(sorts)
        .select(fields)

    const totalDocuments = await Product.countDocuments(filters);

    const pagination = {
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: page,
        previousPage: page - 1 === 0 ? null : page - 1,
        nextPage: page + 1 <= Math.ceil(totalDocuments / limit) ? page + 1 : null
    }

    if(pagination.currentPage > pagination.totalPages){
        pagination.currentPage = null;
        pagination.previousPage = null;
        pagination.nextPage = null;
    }

    return { pagination, products };
}

exports.updateProductService = async (id, data) => {
    const result = await Product.updateOne({ _id: id }, { $set: data }, { runValidators: true });
    return result;

    // const product = await Product.findById(productId)
    // const result = await product.set(data).save()
    // return result;
}

exports.bulkUpdateProductService = async (data) => {
    const products = [];
    data.products.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, { $set: product.data }, { runValidators: true }));
    })

    const result = await Promise.all(products);
    return result;

    // const result = await Product.updateMany({ _id: data.ids }, { $set: data.data }, { runValidators: true });
    // return result;
}

exports.deleteProductService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
}

exports.bulkDeleteProductService = async (ids) => {
    const result = await Product.deleteMany({ _id: ids });
    return result;
}