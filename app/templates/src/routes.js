'use strict';

// Configuration file(s)
var config = require('../pistacheo.conf');

// Libs
var path = require('path');

// Get path to pages
var getPagePath = function getPagePath(page) {
  return path.join(
    config.directories.root,
    config.directories.source,
    config.directories.pages,
    page || 'home');
};

var routes = function(app) {

  // Insert routes below
  app.use('/', require(getPagePath('home')));

};

module.exports = routes;
