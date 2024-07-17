const User = require('../../models/users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {
    try {
        const { username, useremail, userpass, userRoles } = req.body;
        // hash the password.
        const hashPassword = await bcrypt.hash(userpass, 10);

        // check email is exists or not.
        const userEmail = await User.findOne({ "userEmail": useremail });
        if (userEmail) {
            res.status(200).send({ "status": "exists" });
        }
        // Save data to database.
        const user = new User({
            "userName": username,
            "userEmail": useremail,
            "userPassword": hashPassword,
            "userRoles": userRoles
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
        const user = await User.findOne({ 'userEmail': useremail.toLowerCase() });

        if (user.userEmail.length > 0) {
            console.log("its works");
            if (user.userName.toLowerCase() === username.toLowerCase()) {
                const verifyPass = await bcrypt.compare(userpass, user.userPassword);
                if (verifyPass === true | verifyPass === 1) {
                    const token = jwt.sign({userId: user["_id"], roles: user.userRoles}, "XQs2i6C3fk5dsDZ", {expiresIn: '1h'});
                    res.send({ "status": "success", "user": token });
                } else {
                    res.send({ "status": "incorrect" });
                }
            } else {
                res.send({ "status": "username" });
            }
        } else {
            res.send({ "status": "not exists." });
        }
    } catch (err) {
        res.send({ Status: 500, Error: err.toString() });
    }
}