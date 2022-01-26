const Category = require('../models/Category');


// Create a new category
exports.createCategory = async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save((error, category) => {
        if(error){
            res.status(500).json({
                success: false,
                message: error.messge
            })
        }else {
            res.status(200).json({
                success: true,
                category
            })
        }
    })
}


// Get all Categories
exports.getAllCategories = async (req, res) => {
    try{
        const data = await Category.find({}).populate('addedby');
        res.status(200).json({
            success: true,
            categories: data
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Delete Category
exports.deleteCategory = async (req, res) => {
    try{
        await Category.deleteOne({_id: req.params.id});
        res.status(200).json({
            success: true,
            message: "Cateory has been deleted"
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Update a category
exports.updateCategory = async (req, res) => {
    try{
        const slug = req.params.slug;
        const updatedCategory = await Category.findOneAndUpdate({slug}, {name: req.body.name}, {new: true})
        res.status(200).json({
            success: true,
            message: "Category has been updated"
        })
    }catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}