'use strict';

function ToDoDirective () {
  return {
    templateUrl: 'templates/todos.html',
    replace: true,
    controller: 'todoCtrl'
  }
}

module.exports = ToDoDirective;
