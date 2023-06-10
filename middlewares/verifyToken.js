const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "You are not logged in"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;

        next();
    }
    catch (err) {
        res.status(403).json({
            success: false,
            error: err.message
        });
    }
}

module.exports = verifyToken;

// // Another Way
// const verifyToken = async (req, res, next) => {
//     try {
//         if (req.headers && req.headers.authorization) {
//             const token = req.headers.authorization.split(" ")[1]

//             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//             req.user = decoded;

//             next();
//         } else {
//             res.json({
//                 success: false,
//                 message: 'You are not logged in'
//             })
//         }
//     }
//     catch (err) {
//         res.status(403).json({
//             success: false,
//             error: err.message
//         });
//     }
// }

module.exports = verifyToken;

// // Another Way
// // A way to send user's all data in request object
// const jwt = require("jsonwebtoken");
// const User = require("../models/User")

// const verifyToken = async (req, res, next) => {
//     try {
//         if (req.headers && req.headers.authorization) {
//             const token = req.headers.authorization.split(' ')[1]

//             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//             const user = await User.findOne({ email: decoded.email });

//             req.user = user;

//             next();
//         } else {
//             res.json({
//                 success: false,
//                 message: 'You are not logged in!'
//             })
//         }
//     }
//     catch (err) {
//         res.status(403).json({
//             success: false,
//             error: err.message
//         });
//     }
// }

// module.exports = verifyToken;