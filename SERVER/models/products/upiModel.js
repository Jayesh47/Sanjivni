const mongoose = require('mongoose');

const upiSchema = new mongoose.Schema({
    upiID: {type: String},
    creditCard: {type: String},
    expiry: {type: String},
    cvc: {type: String},
    productId: [{type: Object}],
    customerId: {type: String},
    paymentStatus: {type: String, default: false},
    timeStamp: {type: Date, default: Date.now()},
});
const upi = mongoose.model("Payment", upiSchema);
module.exports = upi;