'use strict';

var Todo = require('./models/todo.js');

var todos = [
    'find good drumsets',
    'walk the dog',
    'buy new car'
    ];
    
    todos.forEach(function(todo, index) {
        Todo.find({'name': todo}, function(err, todos) {
            if(!err && !todos.length) {
                Todo.create({complete: false, name: todo});
            };
        });
    })