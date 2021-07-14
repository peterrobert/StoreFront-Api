const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('You are not permitted to access this route');
    try {
        const results = await jwt.verify(token, "jwtPrivateKey");
        req.user = results;
        next();
    } catch (error) {
        res.status(400).send("Please provide the right authentication token")
    }

};

module.exports = auth;