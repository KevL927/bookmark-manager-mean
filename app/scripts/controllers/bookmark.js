'use strict';

function BookmarkCtrl ($scope, dataService) {

  $scope.saveBookmarks = function() {
    var filteredBookmarks = $scope.bookmarks.filter(function(bookmark){
      if(bookmark.edited) {
        return bookmark
      };
    })
    dataService.saveCategory(filteredBookmarks)
      .finally($scope.resetBookmarkState());
  };

  $scope.deleteBookmark = function(bookmark) {
    dataService.deleteBookmark(bookmark).then(function() {
      $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark), 1);
    });
  };

  $scope.saveBookmarks = function() {
    var filteredBookmarks = $scope.bookmarks.filter(function(bookmark){
      if(bookmark.edited) {
        return bookmark
      };
    })
    dataService.saveBookmarks(filteredBookmarks)
      .finally($scope.resetBookmarkState());
  };

  $scope.resetBookmarkState = function() {
      $scope.bookmarks.forEach(function(bookmark) {
         bookmark.edited = false;
      });
  }
}

module.exports = BookmarkCtrl;
