// app.js or index.js

const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
//get json
const fs = require('fs');
var todo = JSON.parse(fs.readFileSync('./todo.json', 'utf8'));

//get todo /todos/:id
app.get('/todos/:id', (req, res) => {
    //find
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;
    todo.forEach((todo) => {
        if (todoId === todo.id) {
            matchedTodo = todo;
        }
    });
    if (matchedTodo) {
        console.log(matchedTodo);
        
        res.json(matchedTodo);
    }
});

//get all todo
app.get('/todos', (req, res) => {
    console.log(todo);
    res.json(todo);
});

//create todo
app.post('/todos', (req, res) => {
    var body = req.body;
    body.id = todo.length + 1;
    todo.push(body);
    console.log(todo);
    res.json(body);
});

//update todo
app.put('/todos/:id', (req, res) => {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;
    todo.forEach((todo) => {
        if (todoId === todo.id) {
            matchedTodo = todo;
        }
    });
    if (matchedTodo) {
        matchedTodo.title = req.body.title;
        console.log(todo);
        res.json(matchedTodo);
    }
});

//delete todo
app.delete('/todos/:id', (req, res) => {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo;
    todo.forEach((todo) => {
        if (todoId === todo.id) {
            matchedTodo = todo;
        }
    });
    if (matchedTodo) {
        todo.splice(todo.indexOf(matchedTodo), 1);
        console.log(todo);
        res.json(matchedTodo);
    }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

