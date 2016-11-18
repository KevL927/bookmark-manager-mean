'use strict';

var mongoose = require('mongoose');

var bookmarkListSchema = new mongoose.Schema({
   _categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
   name: { type: String, required: true },
   url: { type: String, required: true },
   completed: Boolean
});

var Bookmark = mongoose.model('Bookmark', bookmarkListSchema);

module.exports = Bookmark;