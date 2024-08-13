const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    custId: {type: String},
    prodId: {type: String},
    addDate: {type: Date, default: Date.now()},
    Quantity: {type: String},
    SellerId: {type: String},
});
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;