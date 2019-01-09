var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();
router.get('/', function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
})

router.get('/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers =  db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    console.log(matchedUsers);
    res.render('users/index', {
        users: matchedUsers
    });
    console.log(req.query); 
})

router.get('/create', (req, res)=>{
    
    res.render('users/create');
})

router.get('/:id', (req, res)=>{
    // var id = parseInt(req.params.id); Bỏ đi vì dùng shortid rồi!
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();

    res.render('users/view', {
        user: user
    });
})

router.post('/create', function(req, res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

module.exports = router;