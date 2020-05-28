
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

module.exports.Auth = function(req, res, next){

    if (!req.signedCookies.authorId) {
        next();
    }

    const author = db.get('user').find({id : req.signedCookies.authorId}).value();

    res.locals.author = author;

    next();
}