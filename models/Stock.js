const mongoose = require("mongoose");
const validator = require("validator");

const stockSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        trim: true,
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
    price: {
        type: Number,
        required: true,
        min: [0, "Product price can't be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Product quantity can't be negative"]
    },
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
    store: {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, "Please provide a store name!"],
            enum: {
                values: [
                    "dhaka",
                    "chittagong",
                    "rajshahi",
                    "rangpur",
                    "shylet",
                    "barishal",
                    "mymensingh",
                    "khulna"
                ],
                message: "{VALUE} is not a valid name"
            }
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store"
        }
    },
    supplier: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a store name!"],
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier"
        }
    },
    sellCount: {
        type: Number,
        min: 0,
        default: 0
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
})

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;