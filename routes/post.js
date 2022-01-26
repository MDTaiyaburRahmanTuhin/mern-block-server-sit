const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const { createPost, getAllPost, deletePost, singlePost, letestPosts, makeRemoveFeatured, updatePost } = require('../contollers/post');



// Multer Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + file.originalname);
    }
});


const upload = multer({ storage: storage });


router.post('/create', upload.single('articleImage'), createPost);
router.patch('/update/:slug', upload.single('articleImage'), updatePost);
router.get('/', getAllPost);
router.get('/letest', letestPosts);
router.get('/:slug', singlePost);
router.delete('/delete/:id', deletePost);
router.patch('/do/:slug', makeRemoveFeatured);

module.exports = router;