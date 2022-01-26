const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('./User');
const Category = require('./Category');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        requried: true
    },
    addedby: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        requried: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requried: true
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    view: {
        type: Number
    },
    slug: {
        type: String,
        uniqe: true
    }
}, { timestamps: true });


postSchema.pre('save', function(next){
    this.slug = slugify(this.title);
    next();
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;