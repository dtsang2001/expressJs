const db = require('../db');

module.exports.view = (req, res) => {
    res.render('auth/view');
}

module.exports.login = function(req, res){
    res.render('auth/login', {
        csrfToken: req.csrfToken()
    });
}

module.exports.loginPost = function(req, res){
    // res.send(req.body);
    var email = req.body.email;
    const auth = db.get('user').find({ email: email }).value();

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