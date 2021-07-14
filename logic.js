const jwt = require('jsonwebtoken');

const generateToken = (obj) => {
    const Token = jwt.sign({
        _id: obj._id,
        firstname: obj.firstname,
        lastname: obj.lastname,
        email: obj.email
    }, "JwtStoreApiPrivateKey");

    return Token
}


module.exports = generateToken;