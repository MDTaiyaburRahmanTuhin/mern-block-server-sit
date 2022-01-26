const Comment = require('../models/Comment');

// Add a new comment
exports.addComment = async (req, res) => {
    console.log(req.body)
     if(!req.body.post || !req.body.name || !req.body.comment){
        res.status(500).json({
            success: false,
            message: "Form is empty"
        })
    }else {
        const commentAdd = new Comment(req.body);
        commentAdd.save((error, comment) => {
            if(error) {        
                res.status(500).json({
                    success: false,
                    message: "Something is error"
                })
            }else {
                res.status(200).json({
                    success: true,
                    message: "Comment has been added",
                })
            }
        })
    }
    
}


// Get all of comments
exports.getComments = async (req, res) => {
    try{
        const comments = await Comment.find({}).populate('post');
        res.status(200).json({
            success: true,
            comments
        })
    }catch(error) {
        res.status(500).json({
            success: false,
        })
    }
}


// Delete
exports.deletComment = async (req, res) => {
    try{
        await Comment.deleteOne({_id: req.params.id});
        res.status(200).json({
            success: true,
            message: "Comment has been deleted"
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}