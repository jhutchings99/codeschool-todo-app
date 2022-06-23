const Todo = require("./persist/todo");
const fs = require("fs");

// Backup current todos
var startBackup = setInterval((todo) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).substr(-2);
    var day = ('0' + date.getDate()).substr(-2);
    var hour = date.getHours();
    var minute = date.getMinutes();
    var dateStr = [year, month, day, hour, minute].join('');
    Todo.find().then((todo) => {
        fs.writeFile(`./backups/${dateStr}` + ".json", JSON.stringify(todo), err => {
            if (err) {
                console.log(err);
            }
            console.log("successful");
        });
    });
}, 60000);

var restoreBackup = function (jsonFile) {
    let fileData = fs.readFileSync("./backups/" + jsonFile)
    let test = JSON.parse(fileData)
    console.log(test)
}

restoreBackup("202206221046.json")