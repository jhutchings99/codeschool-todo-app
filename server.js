// Initialize express server
const express = require("express");
const app = express();

const startBackup = require("./backup.js");

//Enable cors
const cors = require("cors")

app.use(cors({
    origin: "*"
}))
app.use(express.json());

// Open in default browser
app.use(express.static("todoAppUI"))

const config = require("./config");
var opn = require('opn');
opn(`http://localhost:${config.port}`)

// Pull in helpers
const helpers = require("./helper")

// Pull in schema
const Todo = require("./persist/todo");

app.post("/todo", (req, res) => {
    // validate the data
    const validatedTodo = helpers.setUpTodo(req.body);
    Todo.create(validatedTodo).then((todo) => {
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

// Set up server paths and handlers
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    // const todo = memory.getTodo(id);
    Todo.findById(id).then((todo) => {
        if (todo == null) {
            res.status(404).json({"message": "not found"});
            return;
        }
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

app.get("/tags", (req, res) => {
    res.json(["school", "chore", "family", "work", "home", "errand", "other"])
})

app.get("/todos", (req, res) => {
    Todo.find().then((todo) => {
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id).then((todo) => {
        if (todo == null) {
            res.status(404).json({"message": "not found"});
            return;
        }
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    // validate the data
    const validatedTodo = helpers.setUpTodo(req.body);
    Todo.findByIdAndUpdate(id, validatedTodo, {returnDocument: "after"}).then((todo) => {
        if (todo == null) {
            res.status(404).json({"message": "not found"});
            return;
        }
        res.json(todo);
    }).catch((err) => {
        res.status(500).json(err);
    });
});

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndUpdate(id, req.body, {returnDocument: "after"}).then((todo) =>{
        if (todo == null) {
            res.status(404).json({"message": "not found"});
            return;
        }
        res.json(todo);
    }).catch();
});

module.exports = app;