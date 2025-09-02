const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const Port = process.env.PORT || 4000;
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB Connected!");
    app.listen(Port, () => console.log(`Server is up on Port:${Port}`));
  })
  .catch((err) => {
    console.log("Error Connecting Db ", err);
  });

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
  });
});
const Todo = mongoose.model("Todo", {
  text: String,
  completed: Boolean,
});
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});
