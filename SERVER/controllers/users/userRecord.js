const User = require('../../models/users/userModel');
const multer = require('multer');

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

const upload = multer({storage});

exports.UserRecords = upload.single('user-icon'), async (req, res) => {
    try {
        const data = req.body;
        res.send(data);
    }catch(err) {
        res.status(500).send({"status": "505", Error: err.toString()});
    }
}