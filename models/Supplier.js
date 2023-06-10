const mongoose = require("mongoose");
const validator = require("validator");

const supplierSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name!"],
        minLength: [3, "Name must be at least 3 characters!"],
        maxLength: [100, "Brand name is too big"]
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        }
    },
    contactNumber: {
        type: String,
        required: [true, "Please provide a contact number!"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid phone number"
        }
    },
    emergencyContactNumber: {
        type: String,
        required: [true, "Please provide a emergency contact number!"],
        validate:  {
            validator: (value) => {
                return validator.isMobilePhone(value);
            },
            message: "Please provide a valid phone number"
        }
    },
    tradeLicenceNumber: {
        type: Number,
        required: [true, "Please provide your trade licence number!"],
    },
    presentAddress: {
        type: String,
        required: [true, "Please provide your present address!"],
    },
    permanentAddress: {
        type: String,
        required: [true, "Please provide your permanent address!"],
    },
    location: {
        type: String,
        required: true,
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
            message: "{VALUE} is not a valid division"
        }
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url!"]
    },

    nationalIdImageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url!"]
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    }
}, {
    timestamps: true
})

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;