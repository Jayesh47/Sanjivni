const User = require('../../models/users/userModel');
const Seller = require('../../models/sellers/sellerModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.USER_SECRET_KEY;

const VerifyToken = (token) => {
    const userId = [];
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    res.status(401).send({"Status": "Token Expired!"});
                }
            }
            userId.push(user);
        });
    }
    return userId[0];
}

exports.retrieveInfo = async (req, res) => {
    try {
        const {token} = req.query;
        const user = VerifyToken(token).userId;
        var verify = await User.countDocuments({"_id": user});
        if (verify === 1) {
            const data = await User.findOne({"_id": user});
            res.status(200).send({
                "phone": data.userPhone,
                "address": data.userAddress,
                "city": data.userCity.split(",")[0],
                "state": data.userCity.split(",")[1],
                "pincode": data.userPinCode,
                "landmark": (data.userLandMark) ? data.userLandMark : ""
            });
        }
        else if (await Seller.countDocuments({"_id": user}) === 1) {
            const data = await Seller.findOne({"_id": user});
            res.status(200).send({
                "phone": data.SellerPhone,
                "address": data.SellerStreet,
                "city": data.SellerCity.split(",")[0],
                "state": data.SellerCity.split(",")[1],
                "pincode": data.SellerPincode,
                "landmark": (data.SellerLandmark) ? data.SellerLandmark : ""
            });
        }else {
            res.status(200).send({"Warning": "unknown user"});
        }
    }catch (err) {
        console.log(err);
    }
}
exports.updateInfo = async (req, res) => {
    try {
        const {token, form} = req.body;
        const user = VerifyToken(token).userId;
        if ((await User.countDocuments({"_id": user})) === 1) {
            const oldData = await User.findById(user);
            const city = (form["city"]) ? form["city"] : oldData.userCity.split(",")[0];
            const state = form["state"] ? form["state"] : oldData.userCity.split(",")[1];
            const saveInfo = await User.findByIdAndUpdate(user, {
                userPhone: (form["phone"]) ? form["phone"] : oldData.userPhone,
                userCity: city + "," + state,
                userAddress: (form["street-address"]) ? form["street-address"] : oldData.userAddress,
                userPinCode: (form["pincode"]) ? form["pincode"] : oldData.userPinCode,
                userLandMark: (form["landmark"]) ? form["landmark"] : oldData.userLandMark
            });
            saveInfo.save();
        }else {
            const oldData = await Seller.findById(user);
            const city = form["city"].toString() + "," + form["state"].toString();
            const saveInfo = await Seller.findByIdAndUpdate(user, {
                userPhone: (form["phone"]) ? form["phone"] : oldData.SellerPhone,
                userCity: (city) ? city : oldData.SellerCity,
                userAddress: (form["street-address"]) ? form["street-address"] : oldData.SellerStreet,
                userPinCode: (form["pincode"]) ? form["pincode"] : oldData.SellerPincode,
                userLandMark: (form["landmark"]) ? form["landmark"] : oldData.SellerLandmark
            });
            saveInfo.save();
        }
        res.status(200).send({"Status": "Success"});
    }catch(err) {
        console.log(err);
    }
}