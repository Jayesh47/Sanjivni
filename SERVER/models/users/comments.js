const db = require('mongoose');
const CommentSchema = new db.Schema({
    _Comment: {type: String},
    _timeStamp: {type: Date, default: Date.now()},
    _product: {type: String},
    _Customer: {type: String},
});
const Comment = db.model("userComment", CommentSchema);
module.exports = Comment;