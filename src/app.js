'use strict';

var express = require('express');
var app = express();
var parser = require('body-parser');

var router = require('./api/index')

require('./database');
require('./seed');

app.use('/', express.static('public'));
app.use(parser.json());

app.use('/api', router);

app.listen(8080, function () {
    console.log('The server is running on port 8080.');
});