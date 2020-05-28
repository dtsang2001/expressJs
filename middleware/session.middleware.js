const shortid = require('shortid');

const db = require('../db');

module.exports = function(req, res, next){

    if (!req.signedCookies.sessionId) {
        
        res.cookie('sessionId', shortid.generate(), {
            signed: true
        });

        const sessionId = shortid.generate();

        db.get('session').push({id: sessionId}).write();

        console.log(sessionId);
    }

    next();
}