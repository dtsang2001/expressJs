const User = require('../models/user.model')

module.exports.view = (req, res) => {
    res.render('auth/view');
}

module.exports.login = function(req, res){
    res.render('auth/login');
}

module.exports.loginPost = async (req, res) => {
    // res.send(req.body);
    var email = req.body.email;
    const auth = await User.findOne({ email: email });

    if (!auth) {
        res.render('auth/login', {
            error : "User does not exist",
            dataOld : req.body
        });
        return;
    }

    if (auth.password !== req.body.password) {
        res.render('auth/login', {
            error : "Wrong password",
            dataOld : req.body
        });
        return;
    }

    res.cookie('authorId', auth.id, {signed: true});

    res.redirect('/user');
}

module.exports.logout = (req, res) => {
    res.clearCookie('authorId', {signed: true});
    res.redirect('back');
}