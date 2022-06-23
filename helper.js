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
        tags: todoData.tags || ""
    }
}

module.exports = {
    setUpTodo,
}