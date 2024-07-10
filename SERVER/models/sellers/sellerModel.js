const mongoose = require('mongoose');
const SellerSchema = new mongoose.Schema({
    SellerName: {type: String, required: true},
    SellerEmail: {type: String, required: true},
    SellerPassword: {type: String, required: true},
    SellerStreet: {type: String},
    SellerCity: {type: String},
    SellerLandmark: {type: String},
    SellerPincode: {type: String},
    SellerPhone: {type: String},
    SellerRole: {type: String, default: "Seller"},
    SellerIcon: {type: String}
});
const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
