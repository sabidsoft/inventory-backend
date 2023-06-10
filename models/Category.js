const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Please provide a category name!"],
        maxLength: [100, "Brand name is too big"]
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url!"]
    }
}, {
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;