const express = require('express');

const router = express.Router();


const { registerAccount, login, getUsers, makeAdmin, makeBlogger } = require('../contollers/auth');


router.post('/register', registerAccount);
router.post('/', login);
router.get('/users', getUsers);
router.patch('/make-admin/:userId', makeAdmin);
router.patch('/make-blogger/:userId', makeBlogger);


module.exports = router;