const mongoose = require('mongoose');
const withdrawSchema = new mongoose.Schema({
    AccountNumber: {type: String, required: true},
    Amount: {type: String, required: true},
    remainingAmt: {type: String, required:true},
    timeStamp: {type: Date, default: Date.now()},
    _SellerId: {type: String},
});
const withdraw = mongoose.model("Withdrawal", withdrawSchema);
module.exports = withdraw;