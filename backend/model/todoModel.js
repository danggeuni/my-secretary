const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    todo: {
      type: String,
      required: [true, "Please add a text value"],
    },
    priority: {
      type: Number,
      required: [true, "Please add a text value"],
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
