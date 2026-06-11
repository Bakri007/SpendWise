const mongoose = require("mongoose")


const expenseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required:true,
    },
    amount: {
        type: Number,
        required: [true,"Amount is required"],
        min:[1,"Amount cannot be 0 or negative"]
    },
    description: {
        type: String,
        maxlength: [120, "Max length is 120 characters"]
    },
    date: {
        type: Date,
        default: Date.now,
    },
    payment_method: {
        type: String,
        required: [true,"Choose your payment method"],
        enum: ["cash", "visa", "bank_transfer"]
    },

    
},
{ timestamps: true }

);
const expenseModel = mongoose.model("Expense" , expenseSchema);
module.exports = expenseModel;