const fs = require('fs');
const Post = require('../models/Post');
const Category = require('../models/Category');
const Comment = require('../models/Comment');

exports.createPost = async (req, res) => {
    const { title, addedby, category, description } = req.body;

    const post = {
        title: title,
        addedby: addedby,
        category: category,
        image: req.file.filename,
        description: description
    }

    const newPost = new Post(post);
    await newPost.save((error, post) => {
        if(error){
            res.status(500).json({
                success: false,
                message: error.message
            })
        }else{
            res.status(200).json({
                success: true,
                message: 'Post has been added',
                post: post
            })
        }
    })
}


// Get all posts
exports.getAllPost = async (req, res) => {
    try{
        const category = req.query.category;
        if(category){
            const getCat = await Category.findOne({slug: category});
            const posts = await Post.find({category: getCat._id});
            res.status(200).json({
                success: true,
                posts: posts
            })
        }else{
            const posts = await Post.find({}).populate('addedby').populate('category');
            res.status(200).json({
                success: true,
                posts: posts
            })
        }
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get letest posts
exports.letestPosts = async (req, res) => {
    try{
        const posts = await Post.find({}).sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            success: true,
            posts
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get a single post
exports.singlePost = async (req, res) => {
    try{
        const post = await Post.findOne({slug: req.params.slug}).populate('addedby').populate('category');
        const comments = await Comment.find({post: post.id, isDeleted: false});
        res.status(200).json({
            success: true,
            post,
            comments: comments
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Delete a single post
exports.deletePost = async (req, res) => {
    try{
        const getPost = await Post.findOne({_id: req.params.id});
        const imagePath = `public/images/${getPost.image}`;
        fs.unlinkSync(imagePath);
        await Post.deleteOne({_id: req.params.id});
        res.status(200).json({
            success: true,
            message: "Post has been deleted"
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Make Featured
exports.makeRemoveFeatured = async (req, res) => {
    try{
        const type = req.query.type;
        console.log('This is type: ', type);
        const isPost = await Post.findOne({slug: req.params.slug});
        console.log(isPost);
        if(isPost){
            if(type === 'featured'){
                const updatePost = await Post.findOneAndUpdate({slug: req.params.slug}, {isFeatured: false}, {new: true});
                res.status(200).json({
                    message: "Remove from Featured",
                    post: updatePost,
                })
            }else if (type === 'unfeatured'){
                const updatePost = await Post.findOneAndUpdate({slug: req.params.slug}, {isFeatured: true}, {new: true});
                res.status(200).json({
                    message: "Added on Featured",
                    post: updatePost,
                })
            }
        }else {
            res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Update a post
exports.updatePost = async (req, res) => {
    try{
        const slug = req.params.slug;
        const updatedData = {
            title: req.body.title,
            addedby: req.body.addedby,
            category: req.body.category,
            description: req.body.description
        }
        
        if (req.file?.filename) {
            updatedData.image = req.file.filename
        }

        const updatedPost = await Post.findOneAndUpdate({slug}, updatedData);

        if(req.file?.filename){
            const oldImage = updatedPost.image;
            const imagePath = `public/images/${oldImage}`;
            fs.unlinkSync(imagePath);    
        }    

        res.status(200).json({
            success: true,
            message: 'Post has been updated'
        })


    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}