'use strict';

function MainCtrl ($scope, dataService) {

  dataService.getTodos(function(response){
    var todos = response.data.todo;
    $scope.todos =  todos;
  });

  $scope.addTodo = function() {
    $scope.todos.unshift({name: "New entry",
                      completed: false});
  };

}

module.exports = MainCtrl;
