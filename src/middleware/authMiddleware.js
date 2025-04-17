const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        console.log("Decoded token:", decoded); // Optional: for debugging
        req.user = decoded;
        console.log("Getting tasks for user:", req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
