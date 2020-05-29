const shortid = require('shortid');
const db = require('../db');

module.exports.list = function(req, res){

    var q = req.query.search || '';

    var users = db.get('user').value().filter( (user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    function searchEmpty(){
        if (users.length) {
            return false;
        }else{
            return true;
        }
    };

    var empty = searchEmpty();

    res.render('users/view', {
        users : users,
        query : q,
        empty : empty
    });
}

module.exports.add = function(req, res){
    res.render('users/add', { 
        csrfToken: req.csrfToken() 
    })
}

module.exports.create = function(req, res){
    // req.body.id = db.get('user').value().length + 1;

    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');

    db.get('user')
        .push(req.body)
        .write()

    res.redirect('/user')
}

module.exports.view = function(req, res){
    var id = req.params.id;

    var userDetail = db.get('user').find({ id: id }).value();

    res.render('users/detail', {
        user : userDetail
    })
}