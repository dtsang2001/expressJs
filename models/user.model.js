const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    age: Number,
    email: String,
    phone: String,
    job: String,
    password: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;