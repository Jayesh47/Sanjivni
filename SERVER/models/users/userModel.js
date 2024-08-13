const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userImage: {type: String},
    userName: {type: String, required: true},
    userEmail: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true},
    userPhone: {type: String},
    userAddress: {type: String},
    userPinCode: {type: String},
    userRoles: {type: String},
    userCity: {type: String},
    userLandMark: {type: String}
});
const User = mongoose.model('Customer', userSchema);
module.exports = User; 