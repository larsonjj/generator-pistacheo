'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';

var config = {
  // Site information
  title: 'Sample',
  description: 'A new Pistacheo application.',

  // Local server settings
  host: process.env.HOSTNAME || '127.0.0.1',
  port: process.env.PORT || 9010,

  // Log level
  logLevel: 'dev',

  // URL that site will be served from
  baseUrl: '/',

  // Directories
  // Relative to project root and used within Grunt tasks
  // NOTE: folders prefixed with an underscore (_) will have it removed when moved to build target
  // EX: src/_images -> build/images
  // NOTE: folders NOT prefixed with underscore (_) will be copied to build target 1 to 1
  // EX: src/fonts -> build/fonts
  directories: {
    // Alias for accessing root of project
    root: path.normalize(__dirname),

    // Source directory: author files location
    source: 'src',

    // Destination directory: build target location
    destination: 'build',

    // Temporary directory: temporary development files location
    temporary: 'tmp',

    // Static assets directory (images, stylesheets, scripts, etc)
    public: 'public',

    // Static asset directories (within the 'public' folder)
    images: '_images',
    styles: '_styles',
    scripts: '_scripts',

    // Extra configurable directories
    pages: 'pages',
    config: 'config',
    modules: 'modules',
    layouts: 'layouts',
  },

  // Lusca security configuration
  security: {
    csrf: true,
    csp: false,
    xframe: 'SAMEORIGIN',
    p3p: false,
    hsts: false,
    xssProtection: true
  }<% if (dbOption === 'mongodb') { %>,

  database: {
    // URL to connect to database
    url: process.env.DBURL || '<%= dbURL %>',
    // Mongoose database options
    options: {
      server: {
        socketOptions: {
          // Keep connection alive while server is running
          keepAlive: 1
        }
      },
      // Attempt to reconnect if connection is lost
      auto_reconnect: true
    }
  },<% } else if (dbOption === 'sql') { %>
  database: {
    // URL to connect to database
    url: process.env.DBURL || '<%= dbURL %>',
    // Sequelize database options
    options: {
      // Database Type
      dialect: '<%= dbType %>',

      // max concurrent database requests; default: 50
      maxConcurrentQueries: 50,

      // disable inserting undefined values as NULL
      // - default: false
      omitNull: false,

      // a flag for using a native library or not.
      // in the case of 'pg' -- set this to true will allow SSL support
      // - default: false
      native: false,

      // Specify options, which are used when sequelize.define is called.
      // The following example:
      //   define: {timestamps: false}
      // is basically the same as:
      //   sequelize.define(name, attributes, { timestamps: false })
      // so defining the timestamps for each model will be not necessary
      define: {
        lodashd: false,
        freezeTableName: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
      },

      // similiar for sync: you can define this to always force sync for models
      sync: {
        force: false
      },

      // sync after each association (see below). If set to false, you need to sync manually after setting all associations. Default: true
      syncOnAssociation: true,

      // use pooling in order to reduce db connection overload and to increase speed
      // currently only for mysql and postgresql (since v1.5.0)
      pool: {
        maxConnections: 5,
        maxIdleTime: 30
      },

      // language is used to determine how to translate words into singular or plural form based on the [lingo project](https://github.com/visionmedia/lingo)
      // options are: en [default], es
      language: 'en'
    }
  }<% } %>

};

// Get node environment configuration
var envConfig = require(path.join(config.directories.root, config.directories.source, config.directories.config, 'env', env));

// Export the config object based on the NODE_ENV
module.exports = _.merge(config, envConfig);
