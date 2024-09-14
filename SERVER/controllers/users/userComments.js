const jwt = require('jsonwebtoken');
const secret_key = process.env.USER_SECRET_KEY;
const Comment = require('../../models/users/comments');
const user = require('../../models/users/userModel');

const VerifyToken = (token) => {
    if (token) {
        return jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).send({ "message": "Token Expired!" });
                }
                res.status(403).send({ "message": "Invalid token!" })
            }
            return user.userId;
        });
    }
}

exports.handleComments = (req, res) => {
    try {
        const {userComment, product} = req.body
        const token = req.headers.authorization.slice(7, );
        const _user = VerifyToken(token);
        const _prod = atob(atob(product));
        const newCom = Comment.create({
            '_Comment': userComment.toString(),
            '_Customer': _user,
            '_product': _prod,
        });
        if (newCom) {
            res.status(200).send({
                "Success": true
            });
        }
    }catch(err) {
        console.log(err);
    }
}
exports.sendComments = async (req, res) => {
    try {
        const _product = req.query;
        const comment = await Comment.find({_product: atob(_product["product"]) }).limit(10);
        const _comm = await Promise.all(comment.map(async _data => {
            const cust = await user.findById(_data._Customer);
            return ({
                timeStamp: _data._timeStamp,
                comment: _data._Comment,
                customer: cust.userName,
                customerIcon: cust.userImage
            });
        }));
        res.status(200).send({Comments: _comm});
    }catch (err) {
        console.log(err);
    }
}