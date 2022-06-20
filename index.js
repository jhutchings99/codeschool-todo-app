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
    // validate the data
    const validatedTodo = setUpTodo(req.body);
    const todo = persist.addTodo(validatedTodo);
    res.json(todo);
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.deleteTodo(id);
    res.json(todo);
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    // validate the data
    const validatedTodo = setUpTodo(req.body);
    const todo = persist.setTodo(id, validatedTodo);
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

// Validation function
var setUpTodo = function (todoData) {
    // check deadline and make sure its good
    // check done and make sure its good
    // check name and make sure its good
    // check description and make sure its good
    let deadline = new Date();
    let done = false;

    if (todoData.deadline) {
        deadline = new Date(todoData.deadline);
    }
    
    if (todoData.done) {
        done = todoData.done;
    }

    return {
        name: todoData.name || "",
        done: done,
        description: todoData.description || "",
        deadline: deadline,
    }
}