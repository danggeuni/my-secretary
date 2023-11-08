const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");
const Todo = require("../model/todoModel");
const Comment = require("../model/commentModel");

// @desc    Get comments
// @route   GET /api/comments
// @access  Private
const getComment = asyncHandler(async (req, res) => {
  // todo id로 요청하면 comment 스키마에 저장된 항목을 불러옴
  const comments = await Comment.find({ todo: req.body.todo });
  res.status(200).json(comments);
});

// @desc    Set todo
// @route   POST /api/goals
// @access  Private
const setComment = asyncHandler(async (req, res) => {
  if (!req.body.comment) {
    res.status(400);
    throw new Error("comment가 비어있습니다.");
  }

  const createdComment = await Comment.create({
    comment: req.body.comment,
    user: req.user,
    todo: req.body.todo,
  });

  res.status(200).json(createdComment);
});

// @desc    Update todo
// @route   PUT /api/goals/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  // Comment 스키마에서 현재 id의 정보를 찾아 변수에 저장한다.
  const comment = await Comment.findById(req.params.id);

  // 만약 comment가 없을 경우 현재 id와 일치하는 정보가 없으므로 에러를 던진다.
  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }

  // User 스키마에서 요청자의 id를 찾아 변수에 저장한다.
  const user = await User.findById(req.user.id);

  // 만약 user가 없을 경우 스키마에 일치하는 id가 없으므로 에러를 던진다.
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Todo 스키마에서 요청자의 id를 찾아 변수에 저장한다.
  const todo = await Todo.findById(req.body.todo);

  // 만약 todo가 없을 경우 스키마에 일치하는 id가 없으므로 에러를 던진다.
  if (!todo) {
    res.status(401);
    throw new Error("Todo not found");
  }

  // Make sure the logged in user matches the todo user
  if (comment.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedComment);
});

// @desc    Delete todo
// @route   DELETE /api/goals/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (comment.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  console.log(req.params.id);

  await Comment.findOneAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = { setComment, getComment, updateComment, deleteComment };
