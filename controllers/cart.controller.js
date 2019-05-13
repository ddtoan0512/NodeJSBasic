var Session = require('../models/session.model');
var Product = require('../models/product.model');
module.exports.addToCart = async function(req, res, next){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId){
        res.redirect('/products');
        return;
    }

    let product = await Product.findById(productId);

    Session.findOne({ _id: sessionId }, (err, session) => {
        if(err) {
            console.log(err);
        } else {
            session.cart.push(product);
            session.save((error, session) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(session);
                }
            });
        }
    });

    res.redirect('/products');  
}