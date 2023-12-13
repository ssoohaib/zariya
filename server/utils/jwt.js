const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, 'your-secret-key');
};

const verifyToken = (token) => {
    return jwt.verify(token, 'your-secret-key');
};

module.exports = { generateToken, verifyToken };
