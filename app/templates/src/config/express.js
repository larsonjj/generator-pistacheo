// Express configuration

'use strict';

// Configuration file(s)
var secrets = require('./secrets');
var config = require('../../pistacheo.conf');

// Libs
var path = require('path');
var lusca = require('lusca');
var logger = require('morgan');
var compress = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var session = require('express-session');

var errors = require(path.join(config.directories.root, config.directories.source, config.directories.modules, 'error'));
var routes = require(path.join(config.directories.root, config.directories.source, 'routes'));

var expressConfig = function(app, express<% if (dbOption !== 'none') { %>, db<% } %>) {

  var hour = 3600000;
  var day = hour * 24;
  var week = day * 7;

  // Get current server environment
  var env = app.get('env');

  // Remove x-powered-by header (doesn't let clients know we are using Express)
  app.disable('x-powered-by');

  // Setup port for server to run on
  app.set('port', config.port);

   // Setup view engine for server side templating
  app.engine('<%= htmlOption === 'jade' ? 'jade' : '' %><%= htmlOption === 'swig' ? 'swig' : '' %>', require('<%= htmlOption %>').renderFile);
  app.set('view engine', '<%= htmlOption === 'jade' ? 'jade' : '' %><%= htmlOption === 'swig' ? 'swig' : '' %>');

  // Setup path where all server templates will reside
  app.set('views', path.join(config.directories.root, config.directories.source));

  // Enable GZip compression for all static assets
  app.use(compress());

  if (env === 'development') {
    // Include livereload script on all pages
    app.use(require('connect-livereload')());

    // Load static assets with no-cache
    app.use(
      express.static(
        path.join(
          config.directories.root,
          config.directories.temporary,
          config.directories.public
        ), {maxAge: 0}
      )
    );
  }
  // Load favicon
  app.use(favicon(path.join(config.directories.root, config.directories.source, '/favicon.ico')));
  if (env !== 'development') {
    // Load static assets cached
    app.use(
      express.static(
        path.join(
          config.directories.root,
          config.directories.source,
          config.directories.public
        ), {maxAge: week}
      )
    );
  }

  // Returns middleware that parses both json and urlencoded.
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Returns middleware that parses cookies
  app.use(cookieParser());

  // Enable HTTP Method Overrides (POST, GET, DELETE, PUT, etc)
  // Override HTML forms with method="POST" using ?_method=PUT at the end of action URLs
  // ex <form method="POST" action="/someurl?_method=PUT">
  app.use(methodOverride('_method'));

  // override with the X-HTTP-Method-Override header in the request
  app.use(methodOverride('X-HTTP-Method-Override'));

  // Create cookie that keeps track of user sessions
  app.use(session({
    secret: secrets.sessionSecret,
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: true, // Only server can manipulate cookies
      maxAge: day
    }
  }));

  // Initialize Security
  app.use(lusca(config.security.config));

  app.use(function(req, res, next) {
    // Make Node environment available in templates
    res.locals.env = env;
    res.locals.pistacheo = config;
    next();
  });

  // Setup log level for server console output
  app.use(logger(config.logLevel));

  // Load routes
  routes(app);

  // 404 Error Handler
  app.use(errors('404'));

  if (env === 'development') {
    // Development Error Handler.
    // Log out stack trace
    return app.use(errorHandler());
  }

  // Production Error Handler.
  app.use(errors('500'));

};

module.exports = expressConfig;
