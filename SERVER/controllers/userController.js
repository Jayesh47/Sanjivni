const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.Register = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;

        // hash the password.
        const hashPassword = await bcrypt.hash(userPassword, 10);
        
        // check email is exists or not.
        const useremail = await User.findOne({"userEmail": userEmail});
        if (useremail) {
            res.send("User already exists");
        }
        const user = new User({
            "userName": userName,
            "userEmail": userEmail,
            "userPassword": hashPassword
        });
        await user.save();
        res.send({"status": "success"});

    } catch (err) {
        res.send({ Status: 500, Error: err.toString() });
    }
}
exports.userLogin = async (req, res) => {
    try {
        const {userName, userEmail, userPassword} = req.body;
        const useremail = await User.findOne({'userEmail': userEmail});
        if (useremail) {
            if (useremail.userName === userName) {
                const verifyPass = await bcrypt.compare(userPassword, useremail.userPassword);
                if (verifyPass === true | verifyPass === 1) {
                    res.send({"Success": "You're Login."});
                }else {
                    res.send({"Warning": "incorrect password."});
                }
            }else {
                res.send("username is incorrect");
            }
        }else {
            res.send("user not exists.");
        }
    }catch(err) {
        res.send({Status: 500, Error: err.toString()});
    }
}