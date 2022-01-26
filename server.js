require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
// const expressFileupload = require('express-fileupload');


// Initlize the app
const app = express();


// Import All of routes
const userRoutes = require('./routes/auth');
const categoryRotues = require('./routes/category');
const postRotues = require('./routes/post');
const commentRoutes = require('./routes/comment');
const bloggerRoutes = require('./routes/blogger');
const contactRoutes = require('./routes/contact');


// Database connection
mongoose.connect(process.env.MD_URL)
    .then(() => {
        console.log('Database is connected');
    })
    .catch(error => console.log(error.message))


// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use('/public', express.static('public'));

// Application Routes Middlewares
app.use('/auth', userRoutes);
app.use('/category', categoryRotues);
app.use('/post', postRotues);
app.use('/comment', commentRoutes);
app.use('/blogger', bloggerRoutes);
app.use('/contact', contactRoutes);


// Server configuration
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is playing at ${port}`);
})