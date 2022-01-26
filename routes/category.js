const express = require('express');

const router = express.Router();

const { createCategory, getAllCategories, deleteCategory, updateCategory } = require('../contollers/category');

router.post('/create', createCategory);
router.get('/', getAllCategories);
router.delete('/delete/:id', deleteCategory);
router.patch('/update/:slug', updateCategory);

module.exports = router;