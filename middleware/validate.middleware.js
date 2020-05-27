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
        if (typeof parseInt(req.body.phone) !== "number") {
            errors.push("Wrong age format");
        }else{
            if (req.body.phone.length > 11 && req.body.phone.length < 9) {
                errors.push("Phone numbers must be greater than 9 and smaller than 11");
            }
        }
    }

    if (errors.length) {
        res.render('users/add', {
            errors : errors,
            dataOld : req.body
        });
    }else{
        next();
    }
}