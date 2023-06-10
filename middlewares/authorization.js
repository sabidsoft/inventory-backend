const authorization = (...role) => {

    // returning a middleware
    return (req, res, next) => {
        
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: "You are not authorized to access this"
            })
        }
        
        next();
    }
}

module.exports = authorization;