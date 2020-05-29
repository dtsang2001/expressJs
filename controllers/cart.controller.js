
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

    var count = db.get('session').find({ id : sessionId }).get('cart.' + productId, 0).value();
    var totalQuantity = db.get('session').find({ id : sessionId }).get('totalQuantity', 0).value();
    
    db.get('session').find({ id : sessionId }).set('cart.' + productId, count + 1).write();
    db.get('session').find({ id : sessionId }).set('totalQuantity', totalQuantity + 1).write();

    res.redirect('/product');

};