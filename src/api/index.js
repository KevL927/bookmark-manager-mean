'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var categoryTitle = require('../models/categoryTitle');
var bookmarkList = require('../models/bookmarkList');


mongoose.Promise = global.Promise;

router.get('/category', function(req, res) {
    categoryTitle.find({}, function(err, titles) {
        if(err) {
            return res.status(500).json({message: err.message});
        }
        res.json({'categories': titles});    
    });
});

router.post('/category', function(req, res) {
    var category = req.body;
    categoryTitle.create(category, function(err, title) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.send({'categoryTitle': title, 'message': 'Category Created'});
    });
});

router.put('/category/:id', function(req, res) {
    var id = req.params.id;
    var category = req.body;
    if(category && category._id !== id) {
        return res.status(500).json({err: 'ID mismatch'});
    }
    categoryTitle.findByIdAndUpdate(id, category, {new: true}, function(err, title) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.send({'categoryTitle': title, 'message': 'Category Updated'});
    });
});

router.delete('/category/:id', function(req, res) {
  var id = req.params.id;
  categoryTitle.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Category Deleted' });
  });
});

//-----------------------

router.get('/bookmarks/', function(req, res) {
    bookmarkList.find({}, function(err, bookmarks) {
        if(err) {
            return res.status(500).json({message: err.message});
        }
        res.json({bookmarks: bookmarks});    
    }).populate('_categoryId');
});

router.post('/bookmarks/:categoryId', function(req, res) {
    var categoryId = req.params.categoryId,
        bookmark = req.body;
        
    bookmarkList.create(bookmark, function(err, bookmark) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.send({'bookmark': bookmark, 'message': 'Bookmark Created'});
    });
});

router.put('/bookmark/:bookmarkId', function(req, res) {
    var bookmarkId = req.params.bookmarkId;
    var bookmark = req.body;
    if(bookmark && bookmark._id !== bookmarkId) {
        return res.status(500).json({err: 'ID mismatch'});
    }
    bookmarkList.findByIdAndUpdate(bookmarkId, bookmark, {new: true}, function(err, bookmarkName) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.send({'name': bookmarkName, 'message': 'Bookmark Updated'});
    });
});

router.delete('/bookmark/:bookmarkId', function(req, res) {
  var bookmarkId = req.params.bookmarkId;
  bookmarkList.findByIdAndRemove(bookmarkId, function(err, result) {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    res.json({ message: 'Bookmark Deleted' });
  });
});

module.exports = router;