const Withdraw = require('../../models/sellers/withdrawalAmt');
const secretKey = "6BBSjfFBjnJuUzu";
const jwt = require('jsonwebtoken');

const VerifyToken = (token) => {
    if (token) {
        const _user = jwt.verify(token, secretKey, (err, seller) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).send({ "message": "Token Expired!" });
                }
                res.status(403).send({ "message": "Invalid token" });
            }
            return seller.userId;
        });
        return _user;
    }
}
exports.withdrawalEarnings = async (req, res) => {
    try {
        const {token} = req.body;
        let response;
        const sellerId = VerifyToken(atob(atob(token)));
        let sum = 0;
        const seller = await Withdraw.findOne({_SellerId: sellerId}).sort({timeStamp: -1});
        const totalWithdrawal = await Withdraw.find({_SellerId: sellerId});
        let total = totalWithdrawal.map(money => money.Amount);
        total.forEach(_total => {
            sum += Number(_total);
        });
        if (seller) {
            response = {
                "totalWithdrawal": sum,
                "lastWithdrawal": seller.Amount,
                "Remaining-Balance": seller.remainingAmt,
                "timeStamp": seller.timeStamp
            }
        }else {
            response = {
                "warn": false
            }
        }
        res.status(200).send(response);
    }catch (err) {
        console.log(err);
    }
}
exports.transferEarnings = async (req, res) => {
    try {
        const data = req.body;
        const details = JSON.parse(atob(atob(data["data"])));
        const sellerId = VerifyToken(details["tokens"]);

        const earning = await Withdraw.create({
            AccountNumber: details["withdrawalId"],
            Amount: details["withdrawAmt"],
            remainingAmt: details["remainingAmt"],
            _SellerId: sellerId
        });
        if (earning) {
            res.status(200).send({"Success": true});
        }
    }catch(err) {
        console.log(err);
    }
}