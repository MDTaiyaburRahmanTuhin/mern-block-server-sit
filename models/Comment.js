const mognoose = require('mongoose');
const Post = require('./Post');

const commentSchema = new mognoose.Schema({
    post: {
        type: mognoose.Types.ObjectId,
        ref: 'Post'
    },
    name: {
        type: String,
        requried: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Comment = mognoose.model('Comment', commentSchema);

module.exports = Comment;