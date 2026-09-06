const { verifyToken } = require("../service/authenticaion");


function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPlayload = verifyToken(tokenCookieValue);
            req.user = userPlayload;
        } catch (error) { }
        return next();

    }
}

module.exports = {
    checkForAuthenticationCookie
}