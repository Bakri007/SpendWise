const catchError = require("../middlewares/catchError");
const budgetModel = require("../models/budget");
const AppError = require("../utils/appError");
const statusText = require("../utils/statusText");



const getBudget = catchError(async(req, res, next) => {
      const {month , year }= req.query;
    const budget = await budgetModel.find({ user_id: req.user.id, month, year });
    res.status(200).json({
        status:statusText.SUCCESS,
        data:{ budget }
    });
});


const createBudget = catchError(async (req, res, next) => {
    const { month, year, total_limit, category_limits } = req.body;

    const existingBudget = await budgetModel.findOne({ user_id: req.user.id, month, year });
    if (existingBudget) {
        return next(new AppError("Budget already exists for this month", 400, statusText.FAIL));
    }

    const budget = await budgetModel.create({
        user_id: req.user.id,
        month,
        year,
        total_limit,
        category_limits
    });

    res.status(201).json({
        status: statusText.SUCCESS,
        data: { budget }
    });
});



const updateBudget = catchError(async(req, res, next) => {
    const {month, year, total_limit, category_limits}= req.body;
    const budget = await budgetModel.findOneAndUpdate(
       { _id: req.params.id, user_id: req.user.id},
    {$set: {month, year, total_limit, category_limits}},
{new:true}
);

if(!budget){
    return  next(new AppError("budget not found",404,statusText.FAIL));
}
 res.status(200).json({
    status: statusText.SUCCESS,
    data: { budget },
    });
});




const deleteBudget = catchError(async(req, res, next) => {
    const budget = await budgetModel.findOneAndDelete(
        {_id: req.params.id,user_id: req.user.id}
    );
    if(!budget)
    {
        return next(new AppError("budget not found",404,statusText.FAIL));
    }
    res.status(200).json({
    status: statusText.SUCCESS,
     data: null
    });
});





module.exports = { getBudget, createBudget, updateBudget, deleteBudget };