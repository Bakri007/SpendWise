const mongoose  = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        month: {
            type: Number,
            required: true,
            min:1,
            max:12,
        },
        year: {
            type: Number,
            required:true,
            min:2000
        },
        total_limit: {
            type: Number,
            required:true,
            min:0
        },
        category_limits: [
             {
        category_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
        },
        limit: {
          type: Number,
          min: 0,
        },
      },
        ]

},
 { timestamps: true });
const budgetModel = mongoose.model("Budget", budgetSchema);

module.exports = budgetModel;