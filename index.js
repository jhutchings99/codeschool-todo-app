// Pull in mongoDb
const mongodb = require("./persist/mongo");

// Pull in backup
const backup = require("./backup.js")

// Pull in server
const app = require("./server");

// Pull in config
const config = require("./config");

const startBackup = require("./backup.js");

mongodb.setUpConnectionHandlers(() => {
    // Start server
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    })    
});
mongodb.connect();

backup.startBackup;