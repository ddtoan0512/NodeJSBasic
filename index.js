
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
// LowDB
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()
//=======

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

app.get('/users', function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
})

app.get('/users/search', (req, res) => {
    var users = db.get('users').value();

    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    console.log(matchedUsers);
    res.render('users/index', {
        users: matchedUsers
    });
    console.log(req.query); 
})

app.get('/users/create', (req, res)=>{
    
    res.render('users/create');
})

app.post('/users/create', function(req, res){
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(port,function(){
    console.log('Server listening on port ' + port);
});
