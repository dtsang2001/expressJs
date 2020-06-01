module.exports.createUser = function(req, res, next){
    var errors = [];
    var regexMail = /\S+@\S+\.\S+/;

    if (!req.body.name) {
        errors.push('Name is require');
    }

    if (!req.body.age) {
        errors.push('Age is require');
    }else{
        if (typeof parseInt(req.body.age) !== "number" && parseInt(req.body.age) < 0) {
            errors.push("Wrong age format");
        }
    }

    if (!req.body.address) {
        errors.push('Address is require');
    }

    if (!req.body.email) {
        errors.push('Email is require');
    }else{
        if (!regexMail.test(req.body.email)) {
            errors.push('Wrong email format');
        }
    }

    if (!req.body.phone) {
        errors.push('Phone is require');
    }else{
        if (typeof parseInt(req.body.phone) !== "number") {
            errors.push("Wrong age format");
        }
    }

    if (!req.file) {
        errors.push('Image is require');
    }else{
        if (req.file.mimetype.split('/').slice(0, 1).join('') !== "image") {
            errors.push('Wrong image format');
        }
    }

    if (errors.length) {
        res.render('users/add', {
            errors : errors,
            dataOld : req.body,
            csrfToken: req.csrfToken()
        });
    }
    next();
}


module.exports.updateUser = (req, res, next) => {
    var errors = [];
    var regexMail = /\S+@\S+\.\S+/;

    if (!req.body.name) {
        errors.push('Name is require');
    }

    if (!req.body.age) {
        errors.push('Age is require');
    }else{
        if (typeof parseInt(req.body.age) !== "number" && parseInt(req.body.age) < 0) {
            errors.push("Wrong age format");
        }
    }

    if (!req.body.address) {
        errors.push('Address is require');
    }

    if (!req.body.email) {
        errors.push('Email is require');
    }else{
        if (!regexMail.test(req.body.email)) {
            errors.push('Wrong email format');
        }
    }

    if (!req.body.phone) {
        errors.push('Phone is require');
    }else{
        if (typeof parseInt(req.body.phone) !== "number") {
            errors.push("Wrong age format");
        }
    }

    if (errors.length) {
        res.render('users/add', {
            errors : errors,
            dataOld : req.body,
            csrfToken: req.csrfToken()
        });
    }
    next();
}