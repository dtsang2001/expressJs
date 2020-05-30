const shortid = require('shortid');
// const csurf = require('csurf')
const db = require('../db');
const User = require('../models/user.model');

module.exports.list = async (req, res) => {

    var user = await User.find();

    var q = req.query.search || '';

    var users = user.filter( (user) => {
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
    res.render('users/add', { csrfToken: req.csrfToken() })
}

module.exports.create = function(req, res){

    req.body.avatar = req.file.path.split('/').slice(1).join('/');

    var data = [
        {
            name: req.body.name,
        }
    ]

    console.log(req.body);
    
    // res.redirect('/user')
    res.json(req.body);
}

module.exports.view = async (req, res) => {
    var id = req.params.id;

    var user = await User.findOne({ _id: id });

    res.render('users/detail', {
        user : user
    })
}