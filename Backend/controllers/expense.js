const catchError = require("../middlewares/catchError");
const expenseModel = require("../models/Expense");
const AppError = require("../utils/appError");
const statusText = require("../utils/statusText");



const getExpenses = catchError(async(req, res, next) => {
    const expense = await expenseModel.find({ user_id: req.user.id });
    res.status(200).json({
        status:statusText.SUCCESS,
        data:{ expense }
    });
});



const createExpense = catchError(async(req, res, next) => {
    const {amount, description, date, payment_method, category_id}= req.body;
    const expense = await expenseModel.create({ user_id: req.user.id,
        amount,
        description,
        date,
        payment_method,
        category_id });
    res.status(200).json({
        status:statusText.SUCCESS,
        data:{ expense }
    });
});



const updateExpense = catchError(async(req, res, next) => {
    const {amount, description, date, payment_method, category_id}= req.body;
    const expense = await expenseModel.findOneAndUpdate(
        {_id: req.params.id, user_id: req.user.id },
    {$set: {amount, description, date, payment_method, category_id}},
{new:true}
);

if(!expense){
    return  next(new AppError("Expense not found",404,statusText.FAIL));
}
 res.status(200).json({
    status: statusText.SUCCESS,
    data: { expense },
    });
});



const deleteExpense = catchError(async(req, res, next) => {
    const expense = await expenseModel.findOneAndDelete(
        {_id: req.params.id,user_id: req.user.id}
    );
    if(!expense)
    {
        return next(new AppError("Expense not found",404,statusText.FAIL));
    }
    res.status(200).json({
    status: statusText.SUCCESS,
     data: null
    });
});



module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };