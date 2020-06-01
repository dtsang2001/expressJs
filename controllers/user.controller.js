const fs = require('fs');

const User = require('../models/user.model');

module.exports.list = async (req, res) => {

    var user = await User.find();

    var q = req.query.search || '';

    var users = user.filter( (user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('users/list', {
        users : users,
        query : q
    });
}

module.exports.add = function(req, res){
    res.render('users/add', { csrfToken: req.csrfToken() })
}

module.exports.create = function(req, res){

    var avatar = req.file.path;

    var data = [
        {
            name: req.body.name,
            age: parseInt(req.body.age),
            address: req.body.address,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            avatar: avatar
        }
    ]

    console.log(data);

    User.insertMany(data);
    
    res.redirect('/user')
    // res.json(data);
}

module.exports.edit = async (req, res) => {
    var id = req.params.id;

    var user = await User.findOne({ _id: id });

    res.render('users/edit', {
        user : user,
        csrfToken: req.csrfToken()
    })
}

module.exports.update = async (req, res) => {
    try {
        var id = req.params.id;

        var user = await User.findOne({ _id: id });

        if (!req.file) {
            var avatar = user.avatar;
        }else{

            console.log(path.resolve(__dirname, '../public', user.avatar));

            fs.unlinkSync(user.avatar);

            var avatar = req.file.path;
        }
        
        var data = {
            name: req.body.name,
            age: parseInt(req.body.age),
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            avatar: avatar
        }

        await User.findOneAndUpdate({_id : id}, {$set: data });

        res.redirect('/user');
   
    } catch (error) {
        console.log(error);
    }
}

module.exports.remove = async (req, res) => {
    try {
        var id = req.params.id;

        var user = await User.findOne({ _id: id });

        fs.unlinkSync(user.avatar);

        await User.remove({_id : id});

        res.redirect('/user');

    } catch (error) {
        console.log(error);
    }
}

module.exports.view = async (req, res) => {
    var id = req.params.id;

    var user = await User.findOne({ _id: id });

    res.render('users/view', {
        user : user
    })
}