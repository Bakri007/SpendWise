const mongoose = require("mongoose");

const incomeschema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required:true
        },
        amount: {
            type:Number,
            min:1,
            required:true
        },
        description: {
            type:String,
            maxlength:120
        },
        date: {
            type:Date,
            default:Date.now
        },
        source: {
            type:String,
            enum:["salary", "freelance", "investment", "other"]
        }

    },
    { timestamps: true }
);

const incomeModel = mongoose.model("Income", incomeschema);

module.exports = incomeModel; 