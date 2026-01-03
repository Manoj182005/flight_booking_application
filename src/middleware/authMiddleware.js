import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - User must be logged in
export const protect = async (req, res, next) => {
    let token;

    // Read the JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user from the token, excluding the password
            req.user = await User.findById(decoded.userId).select('-password');

            next(); // Move to the next function (the controller)
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Admin middleware - User must be an admin
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};