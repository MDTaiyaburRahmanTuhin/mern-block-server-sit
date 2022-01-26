const { Subscribe, Message } = require('../models/Contact');


// Add new Subscribe
exports.addSubscribe = async (req, res) => {
    console.log(req.body);
    const subscribeAdd = new Subscribe(req.body);
    await subscribeAdd.save((error, subscribe) => {
        if(error){
            res.status(500).json({
                success: false,
                message: "Something error"
            })
        }else {
            res.status(200).json({
                success: true,
                message: "Subscribed"
            })
        }
    })
}

// Add new contact
exports.addMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save((error, message) => {
        console.log(message);
        if(error){
            res.status(500).json({
                success: false,
                message: "Something error"
            })
        }else {
            res.status(200).json({
                success: true,
                message: "Message has sent"
            })
        }
    })
}