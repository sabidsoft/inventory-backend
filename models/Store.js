const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name!"],
        lowercase: true,
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
    description: {
        type: String
    },
    manager: {
        name: {
            type: String
        },
        contactNumber: {
            type: String
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
}, {
    timestamps: true
})

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;