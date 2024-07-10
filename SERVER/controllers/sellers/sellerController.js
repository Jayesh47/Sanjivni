const Seller = require('../../models/sellers/sellerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = "6BBSjfFBjnJuUzu";

exports.SellerRegister = async (req, res) => {
    try {
        const getData = req.body;
        console.log(getData);
        const fetchData = await Seller.findOne({ 'SellerEmail': getData["seller-email"] });
        if (fetchData) {
            res.status(200).send({ "Status": "exists" });
        } else {
            const hashPass = await bcrypt.hash(getData["create-pass"], 10);
            const SaveData = await Seller.create({ "SellerName": getData["seller-name"], "SellerEmail": getData["seller-email"], "SellerPassword": hashPass });
            if (SaveData) {
                res.status(200).send({ "Status": "Success" });
            } else {
                res.status(200).send({ "Status": "process" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

exports.SellerLogin = async (req, res) => {
    try {
        const { sellername, selleremail, sellerpass } = req.body;

        const userDetails = await Seller.findOne({ "SellerEmail": selleremail });
        if (userDetails) {
            const checkPass = await bcrypt.compare(sellerpass, userDetails.SellerPassword);
            if (sellername !== userDetails.SellerName) {
                res.status(200).send({"Status": "invalid name"});
            }
            if (checkPass === true) {
                const token = jwt.sign({ "userId": userDetails._id, "roles": userDetails.SellerRole }, secretKey, { expiresIn: '1h' });
                res.status(200).send({ "Status": "Success", "token": token });
            } else {
                res.status(200).send({ "Status": "incorrect password" });
            }
        } else {
            res.status(200).send({ "Status": "not exists" });
        }
    } catch (err) {
        console.log(err)
    };
}
// {
//     'seller-name': 'Jayesh malviya',
//     'seller-email': 'Jayesh@gmail.com',
//     'seller-pass': 'Jayesh@123',
//      confirm: 'Jayesh@123'
// }