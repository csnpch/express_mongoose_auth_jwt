const jwt = require('jsonwebtoken');
const config = require('..');

const verityToken = (req, res, next) => {
    try {
        const token = req.session.userLogin.token || req.session.admin.token || req.body.token || req.query.token || req.headers['x-access-token'];

        if (!token) {
            return res.error({ msg: "Access not allowed, Token is required" }, 403);
        }

        try {
            const decoded = jwt.verify(token, config.authentication.token_key);
            req.user = decoded;
        } catch(err) {
            return res.error({ msg: "Invalid Token" }, 401);
            // return res.error()
        }
    } catch (error) { return res.error({ msg: "Access not allowed, Token is required" }, 403); }

    return next();
}

module.exports = verityToken;