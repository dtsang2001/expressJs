
// .env
require('dotenv').config();

// npm Package
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
const routeUser = require('./routes/user.route');
const routeAuth = require('./routes/auth.route');
const routeProduct = require('./routes/product.route');
const routeCart = require('./routes/cart.route');

// Middleware
const authMiddleware = require('./middleware/auth.middleware');
const globalMiddleware = require('./middleware/global.middleware');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1)

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}))
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(globalMiddleware.Auth);

app.get('/', function(req, res){
    res.render('index');
})
app.use('/user', authMiddleware.requireAuth, routeUser);
app.use('/auth', routeAuth);
app.use('/product', routeProduct);
app.use('/cart', routeCart);


const port = 3000;
app.listen(port, function(){
    console.log('App listening in post localhost:'+port);
});