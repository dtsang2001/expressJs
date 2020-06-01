
const User = require('../models/user.model');

module.exports.Auth = async (req, res, next) => {
    if (req.signedCookies.authorId) {
        const author = await User.findOne({_id : req.signedCookies.authorId});

        res.locals.author = author;
    }

    next();
}