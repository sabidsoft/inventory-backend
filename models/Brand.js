const mongoose = require("mongoose");
const validator = require("validator");

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please provide a brand name!"],
        maxLength: [100, "Brand name is too big"]
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL!"]
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    suppliers: [{
        name: String,
        contactNumber: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;