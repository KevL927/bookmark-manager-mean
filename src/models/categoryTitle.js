'use strict';

var mongoose = require('mongoose');

var categoryTitleSchema = new mongoose.Schema({
   title: { type: String, required: true }
});

var Category = mongoose.model('Category', categoryTitleSchema);

module.exports = Category;