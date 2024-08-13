const Cart = require('../../models/products/cartModel');
const Product = require('../../models/products/productModel');
const jwt = require('jsonwebtoken');
const secretKey = "XQs2i6C3fk5dsDZ";

exports.addToCart = async (req, res) => {
    try {
        const { prodId, token } = req.query;

        if (token !== undefined) {
            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    if (err === "JsonWebTokenError") {
                        res.status(401).send({ "message": 'token expired' });
                    }
                }
                req.cust = user;
            });
        }

        const id = atob(prodId);
        const sellerId = await Product.findById(id);
        const Seller = sellerId._SellerId

        try {
            const custId = req.cust.userId;
            Cart.create({ 'custId': custId, 'prodId': id, 'SellerId': Seller });
            res.status(200).send({ "Status": "Success" });
        } catch (err) {
            res.status(200).send({ "Status": "user not found" });
        }

    } catch (err) {
        console.log(err);
    }
}

const VerifyToken = (token) => {
    const cartItem = [];
    if (token !== undefined) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                if (err === "JsonWebTokenError") {
                    res.status(401).send({ "message": 'token expired' });
                }
            }
            cartItem.push(user);
        });
    }
    return cartItem[0];
}
exports.checkCart = async (req, res) => {
    try {
        const { prodId, token } = req.query;
        const cust = VerifyToken(token);
        if (cust) {
            const custid = cust.userId;
            const id = atob(prodId);
            const product = await Cart.find({ "custId": custid });
            const check = [];
            product.map((prod) => {
                if (prod.prodId === id) {
                    check.push(true)
                }
            });
            if (check[0] === true) {
                res.status(200).send({ "Status": "exists" });
            } else {
                res.status(200).send({ "Status": "not exists" });
            }
        }else {
            res.status(200).send({ "Status": "user not found" });
        }
    } catch (err) {
        console.log(err);
    }
}
exports.removeCartItem = async (req, res) => {
    try {
        const { itemId } = req.query;
        const ids = atob(itemId);
        const removeItem = await Cart.deleteOne({'prodId': ids});
        console.log(removeItem);
        if (removeItem) {
            res.status(200).send({"Status": "Success"});
        }else {
            res.status(200).send({"Status": "Try Again!"});
        }
    } catch (err) {
        console.log(err);
    }
}

exports.cartDetails = async (req, res) => {
    try {
        const {tokens} = req.query;
        const user = VerifyToken(tokens).userId;
        const cartItems = await Cart.find({'custId': user}).exec();
        const cartItemsDetails = [];
        for (const cartItem of cartItems) {
            const prodId = cartItem.prodId;
            const items = await Product.findById(prodId).exec();
            const cal = items.productPrice - (parseFloat(items.productPrice) * parseFloat(items.productDiscount)) / 100;
            cartItemsDetails.push({
                "ItemName": items.productTitle,
                "ItemPrice": items.productPrice,
                "ItemImage": items.thumbnail,
                "discPrice": Math.round(cal * 100) / 100,
                "ItemId": items._id,
                "itemCredit": items.creditPoint
            });
        }
        res.status(200).send(cartItemsDetails);
    }catch(err) {
        res.status(200).send("No user");
    }
}
exports.updateQty = (req, res) => {
    try {
        const data = req.body;
        data.map(async (_qty, i) => {
            await Cart.findOneAndUpdate({'prodId': _qty[1]}, {'Quantity': _qty[0]});
        })
        res.status(200);
    }catch(err) {
        console.log(err);
    }
}