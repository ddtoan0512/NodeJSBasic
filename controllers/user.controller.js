var db = require('../db');
var shortid = require('shortid');
var User = require('../models/user.model');

module.exports.index = async function(req, res){
    // res.render('users/index', {
    //     users: db.get('users').value()
    // });

    var Users = await User.find();
    res.render('users/index', {
        users: Users
    });

    // User.find().then( users => {
    //     res.render('users/index', {
    //         users: users
    //     });
    // })
}

module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedUsers =  db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    console.log(matchedUsers);
    res.render('users/index', {
        users: matchedUsers
    });
    console.log(req.query); 
}

module.exports.create = (req, res)=>{
    res.render('users/create');
}

module.exports.get = (req, res)=>{
    // var id = parseInt(req.params.id); Bỏ đi vì dùng shortid rồi!
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();

    res.render('users/view', {
        user: user
    });
}

module.exports.postCreate =  function(req, res){
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');

    // var user = new User();
    // user.name = req.body.name;
    // user.phone = req.body.phone;
    // user.avatar = req.file.path.split('\\').slice(1).join('/');
    
    // user.save((err, doc) => {
    //         if(!err){
    //             res.redirect('/users');
    //         }
    //         else{
    //             console.log('Loi khi them User' + err);
    //         }
    // })

    User.create(req.body, (err, doc) => {
        if(!err){
            res.redirect('/users')
        }
        else{
            console.log('Loi khi them user' + err);
        }
    })

    // db.get('users').push(req.body).write();
    // res.redirect('/users');
}