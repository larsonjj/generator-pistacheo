'use strict';<% if (singlePageApplication) { %>

var settings = require('../config/env/default');
var path = require('path');<% } %>

var index = function(req, res) {<% if (singlePageApplication) { %>
  // Render index.html to allow application to handle routing
  res.sendFile(
    path.join(settings.staticAssets, '/index.html'),
    {
      root: settings.root
    }
  );<% } else { %>
  res.render('app/index/index', {
    title: 'Home',
    env: process.env.NODE_ENV || 'development'
  });<% } %>
};

module.exports = {
  index: index
};
