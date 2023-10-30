const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
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
    // dueDate: {
    //   type: Object,
    //   required: [false, "Please add a text value"],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
