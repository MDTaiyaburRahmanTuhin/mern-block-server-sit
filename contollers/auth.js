const User = require('../models/User');
const Blogger = require('../models/Blogger');

exports.registerAccount = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save((error, user) => {
        if(error){
            res.status(500).json({
                success: false,
                message: error.messge
            })
        }else {
            res.status(200).json({
                success: true,
                user: user
            })
        }
    })
}


// Login

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({
            success: false,
            message: "Email or passord should not empty"
        })
    }

    try{
        const user = await User.findOne({email: email});
        if(!user){
            res.status(400).json({
                success: false,
                message: "Invaid Credential"
            })
        }
        const isMatch = await user.matchPasswords(password)
        if(!isMatch){
            res.status(404).json({
                success: false,
                error: "Invalid credential"
            })
        }else {
            const token = user.getSignedToken();
            res.status(200).json({
                success: true,
                token,
                user
            })
        }
        

    }catch (error){

    }
}


// get All users
exports.getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// make admin
exports.makeAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const currentUser = await User.findOne({_id: userId});
        if(currentUser.type === 'user' || currentUser.type === 'blogger'){
                const updatedUser = await User.findOneAndUpdate({_id: userId}, {type: 'admin'}, {new: true});
                res.status(200).json({
                    success: true,
                    message: "User has been updated",
                    user: updatedUser
                })
            }else {
                res.status(200).json({
                    success: false,
                    message: "Already user"
                })
            }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
}


// make blogger
exports.makeBlogger = async (req, res) => {
    try{
        const isUser = await User.findOne({_id: req.params.userId});
        if(isUser.type != 'admin' || isUser.type != 'blogger'){
            const updateBloggerRequest = await Blogger.findOneAndUpdate({user: req.params.userId}, {isAccepted: true});
            const updateUser = await User.findOneAndUpdate({_id: req.params.userId}, {type: 'blogger'}, {new: true});
            res.status(200).json({
                success: true,
                user: updateUser,
                message: "Blogger request accepted"
            })
        }else{
            res.status(404).json({
                success: false,
                message: "Not Found"
            })
        }
        
    }catch(error) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
}