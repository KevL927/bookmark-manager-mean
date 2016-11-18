'use strict';

function MainCtrl ($scope, dataService) {

  dataService.getBookmarks(function(response){
    console.log(response.data.bookmarks)
    var bookmarks = response.data.bookmarks;
    $scope.bookmarks =  bookmarks;
  });

  $scope.addBookmark = function() {
    $scope.bookmarks.unshift({name: "New entry"});
  };

}

module.exports = MainCtrl;