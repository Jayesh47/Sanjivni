const product = require('../../models/products/upiModel');
const productdata = require('../../models/products/productModel');
const jwt = require('jsonwebtoken');
const secret_key = process.env.USER_SECRET_KEY;

const VerifyToken = (req, res, next) => {
    var { authorization } = req.headers;
    if (authorization) {
        jwt.verify(authorization.toString(), secret_key, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).send({ "message": "Token Expired!" });
                }
                return res.status(403).send({ "message": "Invalid token!" })
            }
            req.user = user;
            next();
        });
    }else {
        res.status(403).send({"message": "No Token Provided!"});
    }
}

exports.TrackOrder = [VerifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        if (!userId) {
            return res.status(403).send({message: "Invalid user Id."});
        }
        const purchase = await product.find({"customerId": userId});
        const productList = purchase.map((data) => {return ({productId: data.productId, purchTime: data.timeStamp, quantity: data.productId.map(item => item.quantity)})});
        const productIds = productList.flatMap((item) => item.productId.map((product) => product.product));
        const products = await Promise.all(
            productIds.map(async (productId) => {
                const details = await productdata.findById(productId);
                const purchTime = productList.find((item) => item.productId.some((prod) => prod.product === productId)).purchTime;
                return {
                    thumbnail: details.thumbnail,
                    title: details.productTitle,
                    price: details.productPrice,
                    purchTime: purchTime,
                };
            })
        );
        res.status(200).send(products);
        
    }catch(err) {
        console.log(err);
        res.status(500).send({"message": "Internal server error."});
    }
}]

