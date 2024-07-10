const Seller = require('../../models/sellers/sellerModel');
const jwt = require('jsonwebtoken');
const secretKey = "6BBSjfFBjnJuUzu";
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/sellerUpload');
    },
    filename: (req, file, cb) => {
        const date = new Date();
        const time = date.getTime();
        cb(null, `${time}_${file.originalname}`);
    }
})

const upload = multer({ storage });

const VerifyToken = (req, res, next) => {
    var { token } = req.body;
    if (token) {
        jwt.verify(token, secretKey, (err, seller) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).send({ "message": "Token Expired!" });
                }
                res.status(403).send({ "message": "Invalid token" });
            }
            req.seller = seller;
            next();
        });
    }
}


exports.sellerProfile = [
    upload.single("sellerIcon"),
    VerifyToken,
    async (req, res) => {
        try {
            const { sellerName, sellerEmail, sellerstreet, sellercity, sellerstate, sellerlandmark, sellerpincode, sellerphone } = req.body;
            const sellerId = req.seller.userId;
            const old_data = await Seller.findOne({ "_id": sellerId });
            const userCity = sellercity + ", " + sellerstate;
            const userDetails = {};
            if (sellerName !== "undefined") userDetails["SellerName"] = sellerName.toString(); else userDetails["SellerName"] = old_data.SellerName;
            if (sellerEmail !== "undefined") userDetails["SellerEmail"] = sellerEmail.toString(); else userDetails["SellerEmail"] = old_data.SellerEmail;
            if (sellerstreet !== "undefined") userDetails["SellerStreet"] = sellerstreet.toString(); else userDetails["SellerStreet"] = old_data.SellerStreet;
            if (sellercity !== "undefined") userDetails["SellerCity"] = userCity.toString(); else userDetails["SellerCity"] = old_data.SellerCity;
            if (sellerlandmark !== "undefined") userDetails["SellerLandmark"] = sellerlandmark.toString(); else userDetails["SellerLandmark"] = old_data.SellerLandmark;
            if (sellerpincode !== "undefined") userDetails["SellerPincode"] = sellerpincode.toString(); else userDetails["SellerPincode"] = old_data.SellerPincode;
            if (sellerphone !== "undefined") userDetails["SellerPhone"] = sellerphone.toString(); else userDetails["SellerPhone"] = old_data.SellerPhone;

            try {
                if (req.file.filename !== "undefined") {
                    userDetails["SellerIcon"] = req.file.filename;
                    console.log(req.file.filename);
                }
            } catch {
                userDetails["SellerIcon"] = old_data.SellerIcon;
            }

            const seller = await Seller.findByIdAndUpdate(sellerId, userDetails);
            seller.save();
            if (seller) {
                res.status(200).send({"Status": "Success"});
            }else {
                res.status(200).send({"Status": "Waiting"});
            }

        } catch (err) {
            console.log(err);
            res.status(500).send("waiting");
        }
    }
];

exports.sellerRetrival = [
    VerifyToken,
    async (req, res) => {
        try {
            const sellerId = req.seller.userId;
            const retreive_data = await Seller.findById(sellerId);
            if (retreive_data) {
                res.status(200).send({
                    SName: retreive_data.SellerName,
                    SEmail: retreive_data.SellerEmail,
                    SPhone: retreive_data.SellerPhone,
                    SCity: retreive_data.SellerCity,
                    Street: retreive_data.SellerStreet,
                    SLand: retreive_data.SellerLandmark,
                    SPin: retreive_data.SellerPincode, 
                    SIcon: retreive_data.SellerIcon
                });
            }else {
                res.status(200).send("unauthorized");
            }
        } catch (err) {
            res.status(500).send("error founded");
        }
    }
];