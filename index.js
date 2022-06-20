// Initialize express server
const express = require("express");
const app = express();

// Pull in db
const persist = require("./persist")

// Put in command line flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http server to listen on");
flags.parse();

// Put in env vars
const dotenv = require("dotenv");

// Set up port number
const port = flags.get("port") || /* process.env.PORT */ 4000;

// Set up server paths and handlers
app.get("/todo", (req, res) => {
    res.send("get todo");
});

app.get("/todos", (req, res) => {
    res.send("get todos");
});

app.post("/todo", (req, res) => {
    persist.addTodo();
    res.send("post todo");
});

app.delete("/todo", (req, res) => {
    res.send("delete todo");
});

app.put("/todo", (req, res) => {
    res.send("put todo");
});

app.patch("/todo", (req, res) => {
    res.send("patch todo");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})