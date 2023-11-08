const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");
const Todo = require("../model/todoModel");

// @desc    Get todos
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).json(todos);
});

// @desc    Set todo
// @route   POST /api/goals
// @access  Private
const setTodo = asyncHandler(async (req, res) => {
  console.log("I ran!", req.body);
  console.log("USER!", req.user);
  if (!req.body.todo) {
    res.status(400);
    throw new Error("todo가 비어있습니다.");
  }
  if (!req.body.priority) {
    res.status(400);
    throw new Error("priority가 비어있습니다.");
  }
  if (!req.body.dueDate) {
    res.status(400);
    throw new Error("dueDate가 비어있습니다.");
  }

  const todo = await Todo.create({
    todo: req.body.todo,
    priority: req.body.priority,
    user: req.user.id,
    dueDate: req.body.dueDate,
  });

  res.status(200).json(todo);
});

// @desc    Update todo
// @route   PUT /api/goals/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

// @desc    Delete todo
// @route   DELETE /api/goals/:id
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

await Todo.findOneAndDelete(req.params.id);


//  const delTodo= await Todo.findOneAndDelete(req.params.id);
//  console.log("delete", delTodo)

  res.status(200).json({ id: req.params.id });
});

module.exports = { setTodo, getTodos, updateTodo, deleteTodo };
