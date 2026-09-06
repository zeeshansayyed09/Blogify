const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        userProfileImage: user.userProfileImage
    };
    const token = jwt.sign(payload, secret);
    return token;
}

function verifyToken(token){
   const payload = jwt.verify(token, secret);
    return payload
}

module.exports = {
    createTokenForUser,
    verifyToken
};