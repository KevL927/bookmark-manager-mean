'use strict';

var bookmarkTitle = require('./models/categoryTitle.js');
var bookmarkList = require('./models/bookmarkList.js');

var todos = [
    'find good drumsets',
    'walk the dog',
    'buy new car'
    ];
    
    todos.forEach(function(todo, index) {
        bookmarkList.find({'name': todo}, function(err, bookmarks) {
            if(!err && !todos.length) {
                bookmarkList.create({complete: false, name: todo});
            };
        });
    })