/**
 * GET /  ->  <%= _.slugify(name.toLowerCase())  %>
 */
'use strict';

// Configuration file(s)
var config = require('<%= rootDir %>pistacheo.conf');

// Libs
var path = require('path');

// Get list of data
var <%= _.slugify(name.toLowerCase()) %> = function(req, res) {
  res.render(path.join(config.directories.pages, '<%= _.slugify(name.toLowerCase())  %>/<%= _.slugify(name.toLowerCase())  %>'), {
    title: '<%= _.classify(name.toLowerCase())  %>',
    env: process.env.NODE_ENV || 'development'
  });
};

module.exports = {
  <%= _.camelize(name.toLowerCase()) %>: <%= _.slugify(name.toLowerCase()) %>
};
