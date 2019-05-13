// var db = require('../db');
var Product = require('../models/product.model');
module.exports.index = async (req, res, next)=>{
    // var page = parseInt(req.query.page) || 1; //n
    // var perPage = 8; // x

    // var start = (page - 1 ) * perPage;
    // var end = page * perPage;
    // var totalPage = (db.get('products').value().length)/perPage;
    // var drop = (page - 1) * perPage;

    // var sessionId = req.signedCookies.sessionId; 
    
    // var countProd = db.get("sessions")
    // .find({ id: sessionId })
    // .get("cart")
    // .size()
    // .value();

    // res.render('products/index', {
    //     //products: db.get('products').value().slice(start,end);
    //     products: db.get('products').drop(drop).take(perPage).value(),
    //     totalPage: totalPage,
    //     perviousPage: parseInt(req.query.page)-1,
    //     nextPage: parseInt(req.query.page)+1,
    //     page: page,
    //     countProd: countProd
    // });

    try{
        let products = await Product.find();
        products.foo();
        res.render('products/index', {
            products: products
        });
    } catch(error){
        next(error);
    }
}