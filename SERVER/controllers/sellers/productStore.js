const Product = require('../../models/products/productModel');
const pay = require('../../models/products/upiModel');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const secretKey = "6BBSjfFBjnJuUzu";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productUpload');
    },
    filename: (req, file, cb) => {
        const date = new Date();
        const time = date.getTime();
        cb(null, `${time}_${file.originalname}`);
    }
})

const upload = multer({ storage });

const VerifyToken = (req, res, next) => {
    if (req.body.token !== undefined) {
        const { token } = req.body;
        jwt.verify(token, secretKey, (err, msg) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    res.status(401).send({ "Status": "Token Expired!" });
                }
            }
            req.user = msg;
            next();
        });
    }
}
exports.AddProduct = [
    upload.single('prodImg'),
    VerifyToken,
    async (req, res) => {
        try {
            const { title, price, discount, qty, description, category } = req.body;
            const _sellerId = req.user.userId;
            const _thumbnail = req.file.filename;
            const product = {};
            const uniquePro = await Product.findOne({ 'productTitle': title });
            if (uniquePro) {
                res.status(200).send({ "Status": "unique" });
            } else {
                if (title !== "undefined") product["productTitle"] = title.toString();
                if (price !== "undefined") product["productPrice"] = price.toString();
                if (discount !== "undefined") product['productDiscount'] = discount.toString();
                if (qty !== "undefined") product["productQty"] = qty.toString();
                if (description !== "undefined") product["productDesc"] = description.toString();
                if (category !== "undefined") product["productCategory"] = category.toString();
                if (_thumbnail) product["thumbnail"] = _thumbnail;
                product["_SellerId"] = _sellerId;
                const cal = price - (parseFloat(price) * parseFloat(discount)) / 100;
                const disPrice = Math.round(cal * 100) / 100;
                product["creditPoint"] = disPrice / 50;

                const add = await Product.create(product);
                add.save();
                if (add) {
                    res.status(200).send({ "Status": "Success" });
                } else {
                    res.status(200).send({ "Status": "Waiting" });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
];

exports.ViewProducts = [
    VerifyToken,
    async (req, res) => {
        try {
            const _sellerId = req.user.userId;
            const prod = await Product.find({ "_SellerId": _sellerId });
            const data = [];
            prod.map((product) => {
                data.push({
                    productImg: product.thumbnail,
                    productTitle: product.productTitle,
                    productQty: product.productQty,
                    productId: product._id
                });
            });
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
        }
    }
];

exports.RemoveProducts = async (req, res) => {
    try {
        const data = req.query.title;

        const deletedProduct = await Product.findOneAndDelete({ productTitle: data });
        if (!deletedProduct) {
            return res.status(404).send({ error: 'Product not found' });
        }
        else {
            res.status(200).send({ "Status": "Deleted" });
        }
    } catch (err) {
        console.log(err);
    }
}
exports.productDetails = async (req, res) => {
    try {
        const { _productId } = req.query;
        const getProd = await Product.findOne({ "_id": _productId });
        res.status(200).send({
            prodImg: getProd.thumbnail,
            prodName: getProd.productTitle,
            prodDesc: getProd.productDesc,
            prodDisc: getProd.productDiscount,
            prodPrice: getProd.productPrice,
            prodQty: getProd.productQty
        });
    } catch (err) {
        console.log(err);
    }
}

exports.updateDetails = [
    upload.single("prodImg"),
    async (req, res) => {
        try {
            const product = req.body;

            const old_data = await Product.findOne({ _id: product["prodId"] });

            const data = {};
            if (product["item-title"] !== undefined) data["productTitle"] = product["item-title"]; else data["productTitle"] = old_data.productTitle;
            if (product["item-discount"] !== undefined) data["productDiscount"] = product["item-discount"]; else data["productDiscount"] = old_data.productDiscount;
            if (product["item-qty"] !== undefined) data["productQty"] = product["item-qty"]; else data["productQty"] = old_data.productQty;
            if (product["item-description"] !== undefined) data["productDesc"] = (product["item-description"]); else data["productDesc"] = old_data.productDesc
            if (product["item-category"] !== undefined) data["productCategory"] = (product["item-category"]); else data["productCategory"] = old_data.productCategory;
            try {
                if (req.file.filename !== undefined) data["thumbnail"] = req.file.filename;
                data["createAt"] = Date.now();
            } catch (err) {
                data["thumbnail"] = old_data.thumbnail;
            }

            if (data) {
                const update = await Product.findByIdAndUpdate(product["prodId"], data);
                if (update) res.status(200).send({ "Status": "Success" });
            } else {
                res.status(200).send({ "Status": "Not Updated!" });
            }
        } catch (err) {
            console.log(err);
        }
    }
];

const findProduct = async (productId) => {
    return await Product.findById(productId.toString());
}

exports.soldProducts = [
    VerifyToken, 
    async (req, res) => {
    try {
        let _seller = req.user["userId"];
        const _sellerId = _seller;
        const _buying = await pay.find();
        const data = await Promise.all(_buying.map(async _pays => {
            const products = await Promise.all(_pays.productId.map(async prod => {
                if (_sellerId === prod["Seller"]) {
                    const item = await findProduct(prod["product"]);
                    return {
                        item_img: item.thumbnail,
                        item_name: item.productTitle,
                        item_qty: prod["quantity"],
                        item_purchase_time: _pays["timeStamp"],
                        item_price: item.productPrice
                    };
                }
            }));
            return products.filter(product => product !== undefined);
        }));
        
        const filteredData = data.filter(products => products.length > 0);

        res.status(200).send({items: JSON.stringify(filteredData)});

    } catch (err) {
        console.log(err);
    }
}]