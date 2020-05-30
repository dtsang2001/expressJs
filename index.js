
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const bodyParse = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const routeUser = require('./routes/user.route');
const routeAuth = require('./routes/auth.route');
const routeProduct = require('./routes/product.route');
const routeCart = require('./routes/cart.route');

const authMiddleware = require('./middleware/auth.middleware');
const sessionMiddleware = require('./middleware/session.middleware');
const globalMiddleware = require('./middleware/global.middleware');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}))
app.use(cookieParser(process.env.SESSION_SECRET));
// const upload = multer({ dest: './public/uploads/'})
// app.use(multer({ dest: './public/uploads/'}).single('avatar'));
// app.use(csurf({ cookie: true}));
app.use(sessionMiddleware); 
app.use(globalMiddleware.Cart);
app.use(globalMiddleware.Auth);

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
})

app.use('/user', authMiddleware.requireAuth, routeUser);
app.use('/auth', routeAuth);
app.use('/product', routeProduct);
app.use('/cart', routeCart);

app.listen(port, function(){
    console.log('App listening in post localhost:'+port);
});