'use strict';

// Configuration file(s)
var config = require('../../../pistacheo.conf');

// Libs
var path = require('path');

// Send error based on request 'Accept' header
var sendError = function sendError(err, res) {
  res.status(err.status);
  res.format({
    html: function() {
      res.render(err.viewPath, {
        status: err.status,
        message: err.message
      });
    },
    json: function() {
      res.json({
        status: err.status,
        message: err.message
      });
    },
    text: function() {
      res.send(err.status + ': ' + err.message);
    }
  });
};

// Handle 404 and 500 errors
var errors = function errors(errorCode) {
  var viewPath = path.join(
    config.directories.root,
    config.directories.source,
    config.directories.modules,
    '/error',
    errorCode
  );

  var status = errorCode || 500;

  // 404 errors
  var pageNotFound = function pageNotFound(req, res) {
    var message = 'Page not found';

    sendError({
      message: message,
      status: status,
      viewPath: viewPath
    }, res);
  };

  // 500 errors
  var serverError = function serverError(err, req, res) {
    var message = err.message;
    var errStatus = err.status || 500;

    sendError({
      message: message,
      status: errStatus,
      viewPath: viewPath
    }, res);
  };

  if (errorCode === '404') {
    return pageNotFound;
  }
  else {
    return serverError;
  }
};

module.exports = errors;
