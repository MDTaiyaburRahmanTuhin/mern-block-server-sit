const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryipt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a Email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: true
    },
    type: {
        type: String,
        enum: ['admin', 'blogger', 'user'],
        default: 'user'
    }
}, { timestamps: true });


userSchema.pre('save', async function (next){
    
    const salt = await bcryipt.genSalt(10);
    this.password = await bcryipt.hash(this.password, salt);

    next();
})


userSchema.methods.matchPasswords = async function (password) {
    return bcryipt.compare(password, this.password);
}

userSchema.methods.getSignedToken = function () {
    return jwt.sign({id: this._id}, 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0MTIzNTYzOCwiaWF0IjoxNjQxMjM1NjM4fQ.6sLZbo7IwS7WVgqr_PoHu6EzGYcaybjx07MfTLyDeQc', {expiresIn: '10min'})
}

const User = mongoose.model('User', userSchema);
module.exports = User;