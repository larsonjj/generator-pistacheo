// Database Configuration

'use strict';

// Configuration file(s)
var config = require('../../pistacheo.conf');

var mongoose = require('mongoose');

var databaseConfig = function(app) {

  // Get current server environment
  var env = app.get('env');

  // Connect to database
  mongoose.connect(config.database.url, config.database.options);

  if (env === 'development') {
    // Log database actions
    mongoose.set('debug', true);
  }

};

module.exports = databaseConfig;
