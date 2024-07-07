const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createjwttoken(payload) {
    return jwt.sign(payload, 'hM22hxPEPHDDfYB', { expiresIn: '1h' });
}

function verifyTokens(token) {
    return jwt.verify(token, 'hM22hxPEPHDDfYB');
}

exports.Register = async (req, res) => {
    try {
        const { username, useremail, userpass } = req.body;
        // hash the password.
        const hashPassword = await bcrypt.hash(userpass, 10);

        // check email is exists or not.
        const userEmail = await User.findOne({ "userEmail": useremail });
        if (userEmail.userEmail.length > 0) {
            res.status(200).send({ "status": "exists" });
        }

        // Save data to database.
        const user = new User({
            "userName": username,
            "userEmail": useremail,
            "userPassword": hashPassword
        });
        await user.save();
        res.status(200).send({ "status": "success" });

    } catch (err) {
        res.status(500).send({ Status: 500, Error: err.toString() });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { username, useremail, userpass } = req.body;
        const user = await User.findOne({ 'userEmail': useremail });

        if (user.userEmail.length > 0) {
            if (user.userName === username) {
                const verifyPass = await bcrypt.compare(userpass, user.userPassword);
                if (verifyPass === true | verifyPass === 1) {
                    res.send({ "status": "success" });
                } else {
                    res.send({ "status": "incorrect" });
                }
            } else {
                res.send({ "status": "username is incorrect" });
            }
        } else {
            res.send({ "status": "user not exists." });
        }
    } catch (err) {
        res.send({ Status: 500, Error: err.toString() });
    }
}