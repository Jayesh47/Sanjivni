const User = require('../../models/users/userModel');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret_key = "XQs2i6C3fk5dsDZ";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
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
        jwt.verify(token, secret_key, (err, user) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).send({ "message": "Token Expired!" });
                }
                res.status(403).send({ "message": "Invalid token!" })
            }
            req.user = user;
            next();
        });
    }
}

exports.UserRecords = [
    upload.single('user-icon'),
    VerifyToken,
    async (req, res) => {
        try {
            const { name, email, phone, address, city, state, pin } = req.body;
            // decoding tokens.

            const userId = req.user.userId;

            const old_data = await User.findById(userId);
            const usercity = city.toString() + ", " + state.toString();
            const userDetails = {};

            if (name !== "undefined") userDetails["userName"] = name.toString(); else userDetails["userName"] = old_data.userName;
            if (email !== "undefined") userDetails["userEmail"] = email.toString(); else userDetails["userEmail"] = old_data.userEmail;
            if (phone !== "undefined") userDetails["userPhone"] = phone.toString(); else userDetails["userPhone"] = old_data.userPhone;
            if (address !== "undefined") userDetails["userAddress"] = address.toString(); else userDetails["userAddress"] = old_data.userAddress;
            if (city !== "undefined") userDetails["userCity"] = usercity.toString(); else userDetails["userCity"] = old_data.userCity;
            if (pin !== "undefined") userDetails["userPinCode"] = pin.toString(); else userDetails["userPinCode"] = old_data.userPinCode;
            
            try {
                if (req.file.filename !== 'undefined') {
                    userDetails["userImage"] = req.file.filename;
                }
            } catch (err) {
                userDetails["userImage"] = old_data.userImage;
            }

            const user = await User.findByIdAndUpdate(userId, userDetails);
            user.save();

            if (user) {
                res.send({ "status": "Success" });
            } else {
                res.send({ "Status": "Error" });
            }

        } catch (err) {
            console.log(err);
        }
    }
];

exports.UserDetails = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const usertoken = token.split(' ')[1];
        if (usertoken) {
            jwt.verify(usertoken, secret_key, (err, user) => {
                if (err) {
                    console.log(err.name);
                    if (err.name === "TokenExpiredError") {
                        res.status(401).send({ "message": "Token Expired!" });
                    }
                    res.status(403).send({ "message": "Invalid token!" })
                }
                req.user = user;
            });
        }
        const data = await User.findById(req.user.userId);

        try {
            res.status(200).send({
                'username': data.userName,
                'useremail': data.userEmail,
                'userphone': data.userPhone,
                'adrs': data.userAddress,
                'city': data.userCity,
                'userpin': data.userPinCode,
                'userImg': data.userImage
            });
        }catch (err) {
            res.status(200).send({
                'username': data.userName,
                'useremail': data.userEmail
            });
        }

    } catch (err) {
        console.log(err);
        res.send({ "status": err.toString() });
    }
}
exports.UserForgot = async (req, res) => {
    try {
        const details = req.body;
        const user = await User.findOne({ 'userEmail': details["user-email"] });
        if (user) {
            const old = await bcrypt.compare(details["old-pass"], user.userPassword);
            console.log(old);
            if (old === 1 || old === true) {
                const newPass = await bcrypt.hash(details["new-pass"], 10);
                const update = await user.updateOne({ 'userPassword': newPass });
                if (update) res.send({ 'Status': 'Success' });
            } else {
                res.send({ "Status": "not matched" });
            }
        } else {
            res.send({ "Status": "invalid" });
        }

    } catch (err) {
        res.status(500).send({ "status": err.toString() });
    }
}