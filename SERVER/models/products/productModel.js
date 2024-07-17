const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    thumbnail: {type: String},
    productTitle: {type: String, unique: true },
    productDesc: {type: String},
    productPrice: {type: String, default: "0"},
    productDiscount: {type: String, default: "0"},
    productQty: {type: String, default: "0"},
    productCategory: {type: String},
    _SellerId: {type:String},
    createAt: {type: Date, default: Date.now()}
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;