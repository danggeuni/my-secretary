const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Goal",
    },
    contents: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reply", replySchema);
