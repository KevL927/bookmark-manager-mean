'use strict';

function DataService ($http, $q) {

  this.getBookmarks = function(cb) {
    $http.get('/api/bookmarks').then(cb);
  };

  this.deleteBookmark = function(bookmark) {
    if (!bookmark._id) {
      return $q.resolve();
    }
    return $http.delete('/api/bookmark/' + bookmark._id).then(function() {
    });
  };

  this.saveBookmarks = function(bookmarks) {
    var queue = [];
    bookmarks.forEach(function(bookmark) {
      var request;
      if(!bookmark._id) {
        request = $http.post('/api/bookmarks', bookmark);
      } else {
        request = $http.put('/api/bookmarks/' + bookmark._id, bookmark).then(function(result) {
          bookmark = result.data.bookmark;
          return bookmark;
        });
      }
      queue.push(request);
    });
    return $q.all(queue).then(function(results) {
    });
  };

}

module.exports = DataService;