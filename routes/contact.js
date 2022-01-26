const router = require('express').Router();


const { addSubscribe, addMessage } = require('../contollers/contact');


router.post('/subscribe/add', addSubscribe);
router.post('/add', addMessage);

module.exports = router;