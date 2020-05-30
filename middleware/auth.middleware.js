
const db = require('../db');

module.exports.requireAuth = function(req, res, next){
    if (!req.signedCookies.authorId) {
        res.redirect('/auth/login');
        return;
    }

    const user = db.get('user').find({id : req.signedCookies.authorId}).value();

    if (!user){
        res.redirect('/auth/login');
        return;
    }

    next();
}