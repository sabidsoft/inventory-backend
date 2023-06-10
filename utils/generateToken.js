const jwt = require("jsonwebtoken");

exports.generateToken = ({ email, role }) => {
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
    return token;
}