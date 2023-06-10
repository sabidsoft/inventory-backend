const { signupService, loginService } = require("../services/user.service");
const { generateToken } = require("../utils/generateToken");

exports.signupController = async (req, res) => {
    try {
        const user = await signupService(req.body);

        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(401).json({
                success: false,
                error: "Please provide your email"
            });
        }

        if (!password) {
            return res.status(401).json({
                success: false,
                error: "Please provide your password"
            });
        }

        const user = await loginService(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "No user found. Please create an account"
            });
        }

        const isMatchedPassword = user.comparePassword(password, user.password);

        if (!isMatchedPassword) {
            return res.status(401).json({
                success: false,
                error: "Your email or password is not correct"
            });
        }

        if (user.status !== "active") {
            return res.status(401).json({
                success: false,
                error: "Your account is not active yet. Please check your email"
            });
        }

        const token = generateToken(user);
        
        res.status(200).json({
            success: true,
            data: user,
            token: token
        });


        // // user info without password
        // const token = generateToken(user);
        // const { password: pass, ...userInfoWithoutPassword } = user.toObject();
        // res.status(200).json({
        //     success: true,
        //     data: userInfoWithoutPassword,
        //     token: token
        // });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
}