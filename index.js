// Initialize express server
const express = require("express");
const app = express();

app.use(express.json());

// Pull in db
const persist = require("./persist")

// Put in command line flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http server to listen on");
flags.parse();

// Put in env vars
const dotenv = require("dotenv");

// Set up port number
const port = flags.get("port") ||  process.env.PORT || 4000;

// Set up server paths and handlers
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
    res.json(todo);
});

app.get("/todos", (req, res) => {
    res.json(persist.getTodos());
});

app.post("/todo", (req, res) => {
    const todo = persist.addTodo(req.body);
    res.json(todo);
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.deleteTodo(id);
    res.json(todo);
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.setTodo(id, req.body);
    res.json(todo);
});

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.patchTodo(id, req.body);
    res.json(todo);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})