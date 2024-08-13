const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
    payment_id: {type:String},
    product_id: [{type: String}],
    seller_id: [{type:String}],
});
const Purchase = mongoose.model('BuyHistory', historySchema);
module.exports = Purchase;