// var db = require('../db');
var Product = require('../../models/product.model');
module.exports.index = async (req, res)=>{

    var products = await Product.find();
    res.json(products);
}

module.exports.create = async function(req, res){
    var product =  await Product.create(req.body);

    res.json(product);
}