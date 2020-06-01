
const User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
    if (!req.signedCookies.authorId) {
        res.redirect('/auth/login');
        return;
    }

    const user = await User.findOne({_id : req.signedCookies.authorId});

    if (!user){
        res.redirect('/auth/login');
        return;
    }

    next();
}