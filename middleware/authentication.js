const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('You are not permitted to access this route');

    try {
        const results = jwt.verify(token, "JwtStoreApiPrivateKey");
        req.user = results;
        next();
    } catch (error) {
         console.log(error)
        // res.status(400).send("Please provide the right authentication token")
    }
};

module.exports = auth;