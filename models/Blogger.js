const mongoose = require('mongoose');
const User = require('./User');

const bloggerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    bloggeremail: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Blogger = mongoose.model('Blogger', bloggerSchema);
module.exports = Blogger;