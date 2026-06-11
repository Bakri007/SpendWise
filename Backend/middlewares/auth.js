const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");
const statusText = require("../utils/statusText");


const verifyToken = async (req,res,next) => {
try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Please sign in to continue", 401, statusText.FAIL));

    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
    };
    next();
}
catch(err) {
   return next(new AppError("Session expired, please sign in again", 401, statusText.FAIL));
}
};

const allowedTo = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role))
            return next(new AppError("You are not allowed to access this route", 403, statusText.FAIL));
    next();
    };

};

module.exports = { verifyToken, allowedTo };