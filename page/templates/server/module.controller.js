/**
 * GET /  ->  <%= _.slugify(name.toLowerCase())  %>
 */

// Configuration file(s)
var config = require('<%= rootDir %>pistacheo.conf');

// Libs
var path = require('path');

'use strict';

// Get list of data
var index = function(req, res) {
  res.render(path.join(config.directories.pages, '<%= _.slugify(name.toLowerCase())  %>/<%= _.slugify(name.toLowerCase())  %>'), {
    title: '<%= _.classify(name.toLowerCase())  %>',
    env: process.env.NODE_ENV || 'development'
  });
};

module.exports = {
  index: index
};
