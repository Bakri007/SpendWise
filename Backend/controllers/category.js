const catchError = require("../middlewares/catchError");
const categoryModel = require("../models/category");
const AppError = require("../utils/appError");
const statusText = require("../utils/statusText");


const getCategories = catchError(async(req, res, next) => {
    const category = await categoryModel.find({ user_id: req.user.id });
    res.status(200).json({
        status:statusText.SUCCESS,
        data:{ category }
    });
});


const createCategory = catchError(async(req, res, next) => {
    const {name, icon, color, type}= req.body;
    const category = await categoryModel.create({ user_id: req.user.id,
        name,
        icon,
        color,
        type });
    res.status(200).json({
        status:statusText.SUCCESS,
        data:{ category }
    });
});

const updateCategory = catchError(async(req, res, next) => {
    const {name , icon, color, type}= req.body;
    const category = await categoryModel.findOneAndUpdate(
        {_id: req.params.id, user_id: req.user.id },
    {$set: {name, icon, color,type}},
{new:true}
);

if(!category){
    return  next(new AppError("Category not found",404,statusText.FAIL));
}
 res.status(200).json({
    status: statusText.SUCCESS,
    data: { category },
    });
});


const deleteCategory = catchError(async(req, res, next) => {
    const category = await categoryModel.findOneAndDelete(
        {_id: req.params.id,user_id: req.user.id}
    );
    if(!category)
    {
        return next(new AppError("Category not found",404,statusText.FAIL));
    }
    res.status(200).json({
    status: statusText.SUCCESS,
     data: null
    });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };