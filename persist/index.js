const todoDb = {};

function makeId(length) {
    var result = "";
    var characters = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const addTodo = function (todo) {
    id = makeId(8);
    todo.id = id;
    todoDb[id] = todo;
}

module.exports = {
    addTodo: addTodo,
}