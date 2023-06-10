const User = require("../models/User");

exports.signupService = async (data) => {
    const user = await User.create(data);
    return user;
}

exports.loginService = async (email) => {
    const user = await User.findOne({ email });
    return user;
}