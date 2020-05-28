
const db = require('../db');

module.exports.view = function(req, res){
    res.render('cart/view')
}

module.exports.add = function(req, res){
    var productId = req.params.id;
    var sessionId = req.signedCookies.sessionId;
    
    if (!sessionId) {
        res.redirect('/product');
        return;
    }
    
    db.get('session').find({ id : sessionId }).value()

    console.log(sessionId);
    // res.redirect('/product');

}