const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


const messageSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        tirm: true
    },
    lastname: {
        type: String,
        required: true,
        tirm: true
    },
    email: {
        type: String,
        required: true,
        tirm: true
    },
    message: {
        type: String,
        required: true,
        tirm: true
    }
})


exports.Subscribe = mongoose.model('Subscribe', subscribeSchema);
exports.Message = mongoose.model('Message', messageSchema);