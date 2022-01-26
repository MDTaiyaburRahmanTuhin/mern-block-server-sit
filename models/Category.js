const mongoose = require('mongoose');
const User = require('./User');
const slugify = require('slugify');


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    addedby: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        uniqe: true
    }
}, { timestamps: true });

categorySchema.pre('save', function(next){
    this.slug = slugify(this.name);
    next();
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;