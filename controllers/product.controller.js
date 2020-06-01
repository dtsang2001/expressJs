var Product = require('../models/product.model');

module.exports.list = async (req, res, next) => {

    var products = await Product.find();

    var perPage = 6;

    var allProducts = products.length;

    var pages = (parseInt(allProducts / perPage)) === allProducts / perPage ? allProducts / perPage : parseInt(allProducts / perPage) + 1;

    var page = parseInt(req.query.page) || 1;

    var start = (page - 1) * perPage;
    var end = page * perPage;

    products = products.slice(start, end);
    
    res.render('products/list', {
        products: products,
        pages : pages,
        page : page
    });
}