var md5 = require('md5');

var db = require('../db');
var Users = require('../models/user.model');

module.exports.login = function(req, res){
    res.render('auth/login', {
        users: Users.find()
    });
}

module.exports.postLogin = async function(req, res){
    const email = req.body.email;
    const password = req.body.password; 
    const hashedPassword = md5(password);

    let user = await Users.findOne({email: email});
    
    if(!user){
        res.render('auth/login',{
            errors: [
                'User does not exist.'
            ],
            values: req.body
        });
        return;
    }

    if(user.password !== hashedPassword){
        res.render('auth/login', {
            errors: [
                'Wrong password!'
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userId', user._id, {
        signed: true
    });
    res.redirect('/users');
}