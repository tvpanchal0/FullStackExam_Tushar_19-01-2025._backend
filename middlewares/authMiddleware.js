const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // Extract the token from the 'Authorization' header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is found, return an error response
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add the user data to req.user from the decoded token
        req.user = decoded;

        // Call the next middleware function
        next();
    } catch (error) {
        // If token verification fails, return an error response
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};

module.exports = authenticate;
