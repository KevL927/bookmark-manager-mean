'use strict';

function MainCtrl ($scope, dataService) {

  dataService.getBookmarks(function(response){
    console.log(response.data.bookmarks)
    var bookmarks = response.data.bookmarks;
    $scope.bookmarks =  bookmarks;
  });

  $scope.addBookmark = function() {
    $scope.bookmarks.unshift({_categoryId: "582f1c518a32280ae0215f46", name: "New entry", url: "www.typeyoururl.com"});
  };

}

module.exports = MainCtrl;