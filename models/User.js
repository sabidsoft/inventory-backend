const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email address is required!"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minNumbers: 1,
                    minLowercase: 3,
                    minUppercase: 1,
                    minSymbols: 1
                })
            },
            message: "Password is not strong enough!"
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password!"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password don't match!"
        }
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, "Please provide your first name!"],
        minLength: [3, "First name must be at least 3 characters!"],
        maxLength: [100, "First name is too large!"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Please provide your last name!"],
        minLength: [3, "Last name must be at least 3 characters!"],
        maxLength: [100, "Last name is too large!"]
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid mobile number!"]
    },

    shippingAddress: String,

    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url!"]
    },
    role: {
        type: String,
        default: "buyer",
        enum: ["buyer", "admin", "stock-manager"]
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"]
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true
})

userSchema.pre("save", function (next) {
    const password = this.password;
    const hashPassword = bcrypt.hashSync(password, 10);
    this.password = hashPassword;

    this.confirmPassword = undefined; // prevent to save confirmPassword in database

    next();
})

userSchema.methods.comparePassword = function (password, hashPassword) {
    const isMatchedPassword = bcrypt.compareSync(password, hashPassword);
    return isMatchedPassword;
}

const User = mongoose.model("User", userSchema);

module.exports = User;