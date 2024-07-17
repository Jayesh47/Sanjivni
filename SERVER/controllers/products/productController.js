const Product = require('../../models/products/productModel');

exports.ProductRetrive = async (req, res) => {
    try {
        const { filter, prodId } = req.body;
        if (prodId) {
            const prod = await Product.findOne({ "_id": prodId });
            const cal = prod.productPrice - (parseFloat(prod.productPrice) * parseFloat(prod.productDiscount)) / 100;
            res.status(200).send({
                itemImg: prod.thumbnail,
                itemName: prod.productTitle,
                itemType: prod.productCategory,
                itemPrice: prod.productPrice,
                discPrice: Math.round(cal * 100) / 100,
                itemDesc: prod.productDesc,
                itemDiscount: prod.productDiscount
            });
        }
        if (!filter && !prodId) {
            const prod = await Product.find();
            const data = [];
            prod.map((product) => {
                const cal = product.productPrice - (parseFloat(product.productPrice) * parseFloat(product.productDiscount)) / 100;
                data.push({
                    title: product.productTitle,
                    thumbnail: product.thumbnail,
                    price: product.productPrice,
                    discount: product.productDiscount,
                    itemType: product.productCategory,
                    discRate: Math.round(cal * 100) / 100,
                    itemId: product._id
                });
            });
            res.status(200).send(data);
        }
        if (filter) {
            const prod = await Product.find({ "productCategory": filter });
            const data = [];
            prod.map((product) => {
                const cal = product.productPrice - (parseFloat(product.productPrice) * parseFloat(product.productDiscount)) / 100;
                data.push({
                    title: product.productTitle,
                    thumbnail: product.thumbnail,
                    price: product.productPrice,
                    discount: product.productDiscount,
                    itemType: product.productCategory,
                    discRate: Math.round(cal * 100) / 100,
                    itemId: product._id
                });
            });
            res.status(200).send(data);
        }
    } catch (err) {
        console.log(err);
    }
};


exports.RecentProducts = async (req, res) => {
    try {
        const getData = await Product.find().sort({ "createAt": -1 }).limit(8);
        const data = [];
        getData.map((product) => {
            const cal = product.productPrice - (parseFloat(product.productPrice) * parseFloat(product.productDiscount)) / 100;
            data.push({
                title: product.productTitle,
                thumbnail: product.thumbnail,
                price: product.productPrice,
                discount: product.productDiscount,
                itemType: product.productCategory,
                discRate: Math.round(cal * 100) / 100,
                prodId: product._id
            });
        });
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
    }
}