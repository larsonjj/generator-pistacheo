'use strict';

// Configuration file(s)
var config = require('../../../pistacheo.conf');

// Libs
var path = require('path');

var index = function(req, res) {
  res.render(path.join(config.directories.pages, 'home/home'), {
    title: 'Home',
    env: process.env.NODE_ENV || 'development'
  });
};

module.exports = {
  index: index
};
