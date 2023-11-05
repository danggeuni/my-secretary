const express = require("express");
const router = express.Router();
const {
  setComment, getComment
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getComment).post(protect, setComment);

// router.route("/").get(protect, getGoals).post(protect, setGoal);
// router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo);

module.exports = router;
