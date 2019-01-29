//==============
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');

var port = 3000;


var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', function(req, res){
    // res.send('<h1>Hello Coders Tokyo</#CANCELh1>');
    res.render('index', {
        name: 'AAA'
    });
})

app.use('/users', userRoute);

app.listen(port,function(){
    console.log('Server listening on port ' + port);
});
