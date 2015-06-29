'use strict';

var express = require('express');
var controller = require('./<%= _.slugify(name.toLowerCase()) %>.controller');

var router = express.Router();

router.get('/<%= _.slugify(name.toLowerCase()) %>', controller.index);

module.exports = router;
