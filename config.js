// Put in env vars
const dotenv = require("dotenv");

// Put in command line flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http server to listen on");
flags.parse();
// Set up port number
const port = flags.get("port") ||  process.env.PORT || 4000;

module.exports = {
    port: port,
}