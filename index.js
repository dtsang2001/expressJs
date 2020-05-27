const express = require('express');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser')

const routeUser = require('./routes/user.route');

const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}))
app.use(cookieParser());

app.use(express.static('public'));

var name = 'xxxx';

app.get('/', function(req, res){

    res.render('index', {
        name : name
    });
})

app.use('/user', routeUser);


app.listen(port, function(){
    console.log('App listening in post localhost:'+port);
});