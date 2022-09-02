const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = process.env.PORT || 8080;
const apiUrl = "/api/todos";

app.use(express.json());

// todos
const todos = [
  { id: uuidv4(), todo: "Create app", completed: true },
  { id: uuidv4(), todo: "Add get todo api", completed: true },
  { id: uuidv4(), todo: "Add create todo api", completed: true },
  { id: uuidv4(), todo: "Add update todo api", completed: true },
  { id: uuidv4(), todo: "Add delete todo api", completed: true },
];

// error
const createErrorObj = (message) => ({ message });

// default
app.get("/", (req, res) => res.send("Todos Rest API app"));

// get todos
app.get(apiUrl, (req, res) => res.send(todos));

// get todo
app.get(`${apiUrl}/:id`, (req, res) => {
  const todoId = req.params.id;
  const todo = todos.find((todo) => todo.id === todoId);
  !!todo
    ? res.send(todo)
    : res.status(404).send(createErrorObj(`Todo with id ${todoId} not found`));
});

// create todo
app.post(apiUrl, (req, res) => {
  const todo = req.body?.todo;

  if (!!todo) {
    const newTodo = {
      id: uuidv4(),
      todo,
    };
    todos.push(newTodo);
    res.send(newTodo);
  } else {
    res.status(400).send(createErrorObj("Todo cannot be empty"));
  }
});

// update todo
app.put(`${apiUrl}/:id`, (req, res) => {
  const todoId = req.params.id;
  const todo = req.body?.todo;
  const todoToUpdate = todos.find((todo) => todo.id === todoId);

  if (!!todoToUpdate) {
    if (!!todo) {
      todoToUpdate.todo = todo;
      res.send(todoToUpdate);
    } else {
      res.status(400).send(createErrorObj("Todo cannot be empty"));
    }
  } else {
    res.status(404).send(createErrorObj(`Todo with id ${todoId} not found`));
  }
});

// delete todo
app.delete(`${apiUrl}/:id`, (req, res) => {
  const todoId = req.params.id;
  const todoToDelete = todos.find((todo) => todo.id === todoId);

  if (!!todoToDelete) {
    const indexToDelete = todos.indexOf(todoToDelete);
    todos.splice(indexToDelete, 1);
    res.send(todoToDelete);
  } else {
    res.status(404).send(createErrorObj(`Todo with id ${todoId} not found`));
  }
});

// start
app.listen(port, () => console.log(`Listening on port ${port}`));
