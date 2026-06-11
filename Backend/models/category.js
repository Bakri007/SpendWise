const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
      trim: true,
    },
    icon: {
      type: String,
      default: "📦",
    },
    color: {
      type: String,
      default: "#000000",
      match: [/^#([0-9A-Fa-f]{6})$/, "Invalid color format"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
    },
    is_default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;