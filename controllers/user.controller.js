const shortid = require('shortid');
const db = require('../db');

module.exports.list = function(req, res){

    res.render('users/view', {
        users : db.get('user').value()
    });
}

module.exports.search = function(req, res){

    var q = req.query.name;
    
    var searchUsers = db.get('user').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    function searchEmpty(){
        if (searchUsers.length) {
            return false;
        }else{
            return true;
        }
    };

    var empty = searchEmpty();

    res.render('users/view', {
        users : searchUsers,
        query : q,
        empty : empty
    })
}

module.exports.add = function(req, res){
    res.render('users/add', {

    })
}

module.exports.create = function(req, res){
    // req.body.id = db.get('user').value().length + 1;

    req.body.id = shortid.generate();

    db.get('user')
        .push(req.body)
        .write()

    res.redirect('/user')
}

module.exports.view = function(req, res){
    var id = req.params.id;

    var userDetail = db.get('user').find({ id: id }).value()

    res.render('users/detail', {
        user : userDetail
    })
}