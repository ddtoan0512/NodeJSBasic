//==============
var express = require('express');
var bodyParser = require('body-parser');

var userRoute = require('./routes/user.route');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Bo di
// var users = [
//     { id: 1,name: 'Toan'},
//     { id: 2,name: 'Hung'},
//     { id: 2,name: 'Thinh'}
// ];

app.get('/', function(req, res){
    // res.send('<h1>Hello Coders Tokyo</h1>');
    res.render('index', {
        name: 'AAA'
    });
})

app.use('/users', userRoute);

app.listen(port,function(){
    console.log('Server listening on port ' + port);
});
