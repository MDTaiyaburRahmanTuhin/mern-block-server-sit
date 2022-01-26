const Blogger = require('../models/Blogger');

exports.addBlogger = async (req, res) => {
    console.log(req.body);
    try{
        const isBlogger = await Blogger.findOne({user: req.body.user});
        console.log(isBlogger);
        if(!isBlogger){
            // create a blogger
            const newBlogger = new Blogger(req.body);
            await newBlogger.save((error, blogger) => {
                if(error){
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                }else {
                    res.status(200).json({
                        success: true,
                        message: "Request has been sent",
                        blogger: blogger
                    })
                }
            })
        }else {
            res.status(200).json({
                success: false,
                message: "Alreay sent a request"
            })
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Get All Bloggers
exports.getAllBloggers = async (req, res) => {
    try{
        const bloggers = await Blogger.find({isAccepted: false}).populate('user');
        res.status(200).json({
            success: true,
            bloggers: bloggers
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}