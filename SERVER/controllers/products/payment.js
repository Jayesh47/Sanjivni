const cart = require('../../models/products/cartModel');
const Pay = require('../../models/products/upiModel');

exports.productPurchased = async (req, res) => {
    try {
        const _Item = req.body;
        const _prodId = [];
        let prod_Id = await cart.find({ 'custId': _Item["cust_id"] });
        // fetch seller of product which save in this.
        prod_Id.forEach(prod => {
            _prodId.push({
                product: prod.prodId,
                quantity: prod.Quantity,
                Seller: prod.SellerId
            });
        });

        if (_Item["user-upi"]) {
            if (_Item["pay_type"] === "UPI") {
                const savePay = new Pay({
                    'upiID': _Item["user-upi"],
                    'customerId': _Item["cust_id"],
                    'productId': _prodId,
                    'paymentStatus': true,
                });
                savePay.save();
            } else {
                const savePay = new Pay({
                    'creditCard': _Item["card-number"],
                    'cvc': _Item["cvv"],
                    'expiry': _Item["exipry"],
                    'customerId': _Item["cust_id"],
                    'productId': _prodId,
                    'paymentStatus': true,
                });
                savePay.save();
            }
            res.status(200).send("Success");
        }
    } catch (err) {
        console.log(err);
    }
}