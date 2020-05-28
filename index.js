
require('dotenv').config();

const express = require('express');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser')

const routeUser = require('./routes/user.route');
const routeAuth = require('./routes/auth.route');
const routeProduct = require('./routes/product.route');
const routeCart = require('./routes/cart.route');

const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');

const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}))
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', authMiddleware.Auth, function(req, res){
    res.render('index');
})

app.use('/user', authMiddleware.requireAuth, authMiddleware.Auth, routeUser);
app.use('/auth', routeAuth);
app.use('/product', authMiddleware.Auth, routeProduct);
app.use('/cart', authMiddleware.Auth, routeCart);


app.listen(port, function(){
    console.log('App listening in post localhost:'+port);
});