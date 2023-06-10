const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Name is required!"],
        minLength: [3, "Name at least 3 characters long!"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs"
        }
    },
    imageURLs: [{
        type: String,
        validate: [validator.isURL, "Please provide valid image URLs"]
    }],
    categories: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE} "
        }
    }
}, {
    timestamps: true
});

productSchema.pre('save', function (next) {
    if (this.quantity === 0) {
        this.status = "out-of-stock";
    }
    next();
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;