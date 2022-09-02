const express = require("express");
const app = express();

app.use(express.json());

const todos = [{ id: 1, todo: "Create app" }];

// default
app.get("/", (req, res) => res.send("Todos Rest API app"));

// get todos
app.get("/api/todos", (req, res) => res.send(todos));

// start
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
