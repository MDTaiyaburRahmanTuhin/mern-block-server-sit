const express = require('express');
const router = express.Router();

const { addBlogger, getAllBloggers } = require('../contollers/blogger');

router.post('/create', addBlogger);
router.get('/', getAllBloggers);

module.exports = router;