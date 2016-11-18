'use strict';

function BookmarkDirective () {
  return {
    templateUrl: 'templates/bookmarks.html',
    replace: true,
    controller: 'BookmarkCtrl'
  }
}

module.exports = BookmarkDirective;
