'use strict';

var express = require('express');
var mongoose = require('mongoose');

// Add coloring for console output
require('colors');

// Create Express server.
var app = express();

// Database configuration
var db = require('./config/database')(app);

// Express configuration
require('./config/express')(app, express<% if (dbOption && dbOption !== 'none') { %>, db<% } %>);

// Verify database connection
mongoose.connection.on('connected', function() {
  console.log('✔ MongoDB Connection Success!'.green);
});

mongoose.connection.on('error', function() {
  throw '✗ MongoDB Connection Error. Please make sure MongoDB is running.'.red;
});

// Start Express server.
app.listen(app.get('port'), function() {
  console.log(
    '✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green,
    app.get('port'),
    app.get('env')
  );
});

module.exports = app;
