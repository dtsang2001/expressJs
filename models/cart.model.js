module.exports = function Cart(cart){

    this.items = cart.items || {};
    this.totalQuantity = cart.totalQuantity || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(product, id, quantity){

        if (!this.items[id]) {
            this.items[id] = {
                item : {
                    id : id,
                    image : product.image,
                    name : product.name,
                    price : product.price                    
                },
                quantity : 0,
                subTotal : 0
            }
        }

        this.items[id].quantity += quantity;
        this.items[id].subTotal += (product.price * quantity);

        this.totalQuantity += quantity;
        this.totalPrice += (product.price * quantity);
    };
}