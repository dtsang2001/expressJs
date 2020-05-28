const db = require('../db');

module.exports.list = function(req, res){
    var perPage = 8;

    var allProducts = db.get('products').value().length;

    var pages = (parseInt(allProducts / perPage) === allProducts / perPage) ? allProducts / perPage : parseInt(allProducts / perPage) + 1;

    var page = parseInt(req.query.page) || 1;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    // var products = db.get('products').value().slice(start, end);
    var products = db.get('products').drop(start).take(perPage).value();

    res.render('products/list', {
        products : products,
        pages : pages,
        page : page
    });
}