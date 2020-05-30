
const db = require('../db');

module.exports.Cart = (req, res, next) => {

    if(req.signedCookies.sessionId){
        const cart = db.get('session').find({ id : req.signedCookies.sessionId }).value();
        res.locals.cart = cart;
    }

    next();
}

module.exports.csrf = (req, res, next) => {
    res.locals._csrfToken = req.csrfToken(),
    next();
}

module.exports.Auth = (req, res, next) => {
    if (req.signedCookies.authorId) {
        const author = db.get('user').find({id : req.signedCookies.authorId}).value();

        res.locals.author = author;
    }

    next();
}