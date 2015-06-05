/**
 * Handle prompt choices and setup template values
 * For file creation
 */

'use strict';

var _ = require('lodash');

var answersConfig = function answersConfig() {

  // If user chooses to use exsiting yo-rc file, then skip prompts
  if (this.existingConfig) {
    this.answers = this.config.get('config');
  }
  else {
    this.answers = _.merge(
      this.projectPrompts,
      this.serverPrompts,
      this.clientPrompts,
      this.documentationPrompts,
      this.testingPrompts,
      this.deploymentPrompts
    );
  }

  // Assign each answer property to `this` context to give the generator access to it

  // Project Info
  this.projectName  = this.answers.projectName;
  this.versionControl = this.answers.versionControl;

  // Server Info
  this.useServer = this.answers.useServer;

  this.dbType = this.answers.dbType || this.answers.dbOption;

  if (this.answers.dbOption === 'sql' || this.answers.dbOption === 'mysql' || this.answers.dbOption === 'postgres') {
    this.answers.dbType = this.dbType;
    this.dbOption = 'sql';
    this.answers.dbOption = 'sql';
  }
  else {
    this.dbOption = this.answers.dbOption;
  }

  // Clear dbPass and/or dbUser if 'nouser' and/or 'nopass'
  if (this.answers.dbUser === 'nouser') {this.answers.dbUser = '';}
  if (this.answers.dbPass === 'nopass') {this.answers.dbPass = '';}

  this.dbUser = this.answers.dbUser;
  this.dbPass = this.answers.dbPass;

  // Setup Database URLs
  var username = this.dbUser || '';
  var password = this.dbPass ? ':' + this.dbPass : '';
  var port   = this.answers.dbPort;
  var host   = this.dbUser ? '@' + this.answers.dbHost : this.answers.dbHost;
  var name   = this.answers.dbName ? this.answers.dbName : '';

  if (this.dbOption === 'mongodb') {
    this.dbURL = process.env.MONGODB || 'mongodb://' +
    username +
    password +
    host + ':' +
    port + '/' +
    name;
  }
  else if (this.dbType === 'mysql') {
    this.dbURL = process.env.MYSQL || 'mysql://' +
    username +
    password +
    host + ':' +
    port + '/' +
    name;
  }
  else if (this.dbType === 'postgres') {
    this.dbURL = process.env.POSTGRES || 'postgres://' +
    username +
    password +
    host + ':' +
    port + '/' +
    name;
  }
  else {
    this.dbURL = '';
  }

  // Client
  this.singlePageApplication = this.answers.singlePageApplication;
  this.htmlOption            = this.answers.htmlOption;
  this.jsFramework           = this.answers.jsFramework;
  this.useJsx                = this.answers.useJsx;
  this.jsOption              = this.answers.jsOption;
  this.cssOption             = this.answers.cssOption;
  this.sassSyntax            = this.answers.sassSyntax;
  this.extras                = this.answers.extras;

  // Default to mocha for testing (cannot use jasmine server-side)
  this.answers.testFramework = this.answers.testFramework || 'mocha';

  // Testing
  this.testFramework = this.answers.testFramework;
  this.useTesting    = this.answers.useTesting;
  this.useServerTesting    = this.answers.useServerTesting;
  this.useE2e        = this.answers.useE2e;

  // Documentation
  this.useJsdoc      = this.answers.useJsdoc;
  this.useKss        = this.answers.useKss;
  this.useDashboard  = this.answers.useDashboard;

  // Default Overwrites
  if (this.jsFramework === 'react') {
    this.jsOption   = this.answers.jsOption   = 'browserify';
  }

  // Default jsOption to Browserify
  this.jsOption = this.answers.jsOption || 'browserify';

};

module.exports = answersConfig;
