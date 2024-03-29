require('dotenv').config();
const jwt = require('jsonwebtoken');

function getOffset(currentPage = 1) {
    return ((currentPage - 1) * [10]).toString();
}

async function tokenValidator(req, res, next) {
    const token = req.header('X-Auth-Token');
    if (!token) {
        next({status: 401, message: "No Access"});
    }

    try {
        const payload = await jwt.verify(token, process.env.SECRET_TOKEN);
        req.body['id'] = payload.uid;
        next();
    } catch (e) {
        next({status: 401, message: "Token is not valid!"});
    }
}

module.exports = {
    getOffset,
    tokenValidator
}