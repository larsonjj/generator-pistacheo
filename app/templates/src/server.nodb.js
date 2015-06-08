'use strict';

// Configuration file(s)
var config = require('../pistacheo.conf');

// Libs
var path = require('path');
var express = require('express');

// Add coloring for console output
require('colors');

// Create Express server.
var app = express();

// Express configuration
require(
  path.join(
    config.directories.root,
    config.directories.source,
    config.directories.config,
    'express'
  )
)(app, express);

// Start Express server.
app.listen(app.get('port'), function() {
  console.log(
    '✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green,
    app.get('port'),
    app.get('env')
  );
});

module.exports = app;
