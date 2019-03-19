// console.log(process.env);
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Routes
var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
//===========
//Middlewares

var authMiddleware = require('./middlewares/auth.middleware');

//===========

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser('lesson17'));
// app.use(cookieParser(process.env.SESSION_SECRET)); //Environment Variables cmd

app.use(express.static('public'));

app.get('/', function(req, res){
    // res.send('<h1>Hello Coders Tokyo</#CANCELh1>');
    res.render('index', {
        name: 'AAA'
    });
})

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', authMiddleware.requireAuth, productRoute);

app.listen(port,function(){
    console.log('Server listening on port ' + port);
});
