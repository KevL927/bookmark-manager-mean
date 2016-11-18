webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('bookmarkListApp', ['angular.filter']);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('bookmarkListApp').service('dataService', __webpack_require__(4));


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	        request = $http.post('/api/bookmarks/582f1c518a32280ae0215f46', bookmark);
	      } else {
	        request = $http.put('/api/bookmark/' + bookmark._id, bookmark).then(function(result) {
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('bookmarkListApp').directive('bookmark', __webpack_require__(6));


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function BookmarkDirective () {
	  return {
	    templateUrl: 'templates/bookmarks.html',
	    replace: true,
	    controller: 'BookmarkCtrl'
	  }
	}

	module.exports = BookmarkDirective;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('bookmarkListApp').controller('MainCtrl', __webpack_require__(8));
	angular.module('bookmarkListApp').controller('BookmarkCtrl', __webpack_require__(9));


/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ }
]);