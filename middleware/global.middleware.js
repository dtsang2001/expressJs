
const db = require('../db');

module.exports.Cart = (req, res, next) => {

    const cart = db.get('session').find({ id : req.signedCookies.sessionId }).value();

    res.locals.cart = cart;

    next();
}