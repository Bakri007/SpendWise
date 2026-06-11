const catchError = require("../middlewares/catchError");
const incomeModel = require("../models/income");
const AppError = require("../utils/appError");
const statusText = require("../utils/statusText");





const getIncomes = catchError(async(req, res, next) => {
    const income = await incomeModel.find({ user_id: req.user.id });
    res.status(200).json({
        status:statusText.SUCCESS,
        data:{ income }
    });
});


const createIncome = catchError(async(req, res, next) => {
    const {amount, description, date, source, category_id}= req.body;
    const income = await incomeModel.create({ user_id: req.user.id,
        amount,
        description,
        date,
        source,
        category_id });
    res.status(200).json({
        status:statusText.SUCCESS,
        data:{ income }
    });
});


const updateIncome = catchError(async(req, res, next) => {
    const {amount, description, date, source, category_id}= req.body;
    const income = await incomeModel.findOneAndUpdate(
        {_id: req.params.id, user_id: req.user.id },
    {$set: {amount, description, date, source, category_id}},
{new:true}
);

if(!income){
    return  next(new AppError("Income not found",404,statusText.FAIL));
}
 res.status(200).json({
    status: statusText.SUCCESS,
    data: { income },
    });
});



const deleteIncome = catchError(async(req, res, next) => {
    const income = await incomeModel.findOneAndDelete(
        {_id: req.params.id,user_id: req.user.id}
    );
    if(!income)
    {
        return next(new AppError("Income not found",404,statusText.FAIL));
    }
    res.status(200).json({
    status: statusText.SUCCESS,
     data: null
    });
});




module.exports = { getIncomes, createIncome, updateIncome, deleteIncome };