const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET || 'default_secret';
        jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = { generateJWT };