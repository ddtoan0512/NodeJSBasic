const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    totalProduct: Number,
    cart: [
        {
            productId: mongoose.Types.ObjectId,
        }
    ]
});
const Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;