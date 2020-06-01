
const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.view = (req, res) => {

    var cart = new Cart( (req.session.cart) ? req.session.cart : {});

    res.render('cart/view', {
        cart : cart.items,
        totalQuantity : cart.totalQuantity,
        totalPrice : cart.totalPrice
    });
}

module.exports.add = async (req, res) => {
    try {

        var quantity = (req.body.quantity) ? req.body.quantity : 1;

        var productId = req.params.id;
        var product = await Product.findOne({_id : productId});

        var cart = new Cart( (req.session.cart) ? req.session.cart : {});

        cart.add(product, productId, quantity);

        req.session.cart = cart;

        res.redirect('product');
        
    } catch (error) {
        console.log('-------' + error);
    }

};