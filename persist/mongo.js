require("dotenv").config();

// set up mongoose
const mongoose = require('mongoose');

// rename mongoose connection to something shorter
const db = mongoose.connection;

function connect (username, password, host, port, db) {
    const connectionString = `mongodb+srv://codeschool:${process.env.DBPASS}@cluster0.lyxopt8.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

function setUpConnectionHandlers (callback) {
    // what happens when connecting
    db.once("connecting", () => {
        console.log("Connecting to MongoDB")
    });
    
    // what happens when it connects
    db.once("connected", () => {
        console.log("Connected to MongoDB")
    });
    
    // what happens when connection opens
    db.once("open", () => {
        console.log("Open Connection to MongoDB")
        callback();
    });
    
    // what happens when connection error
    db.once("error", () => {
        console.log("Error Connecting to MongoDB")
    });
}

// Export the functions
module.exports = {
    connect,
    setUpConnectionHandlers,
}