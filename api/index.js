'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var getDirCount = require('../helpers/get-dir-count');
var path = require('path');
var pistacheoConf;

try {
  pistacheoConf = require(path.join(process.cwd(), './pistacheo.conf'));
  var directories = pistacheoConf.directories;
}
catch(e) {
  return; // Do Nothing
}

var APIGenerator = module.exports = function APIGenerator() {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  var fileJSON = this.config.get('config');

  // options
  this.jsFramework = fileJSON.jsFramework;
  this.testFramework = fileJSON.testFramework;
  this.useTesting = fileJSON.useTesting;
  this.useServerTesting = fileJSON.useServerTesting;
  this.dbOption = fileJSON.dbOption;

};

util.inherits(APIGenerator, yeoman.generators.NamedBase);

// Prompts
APIGenerator.prototype.ask = function ask() {

  if (this.dbOption === 'none' || !this.dbOption) {
    this.log('This subgenerator is only used for Applications using a database.');
    this.log('It seems as though you are not using a database.');
    this.log('Operation aborted.');
    this.abort = true;
    return;
  }

  // var self = this;
  var done = this.async();
  var prompts = [{
    name: 'apiFile',
    message: 'Where would you like to create api files?',
    default: path.join(directories.source, 'api')
  }];

  this.prompt(prompts, function(answers) {

    this.apiFile = path.join(
        answers.apiFile,
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase())
      );

    this.testFile = path.join(
        answers.apiFile,
        this._.slugify(this.name.toLowerCase()),
        '__tests__',
        this._.slugify(this.name.toLowerCase())
      );

    // Get root directory
    this.rootDir = getDirCount(this.apiFile);

    // Get source directory
    this.sourceDir = getDirCount(this.testFile.replace(directories.source + '/', ''));

    done();
  }.bind(this));
};

// Create files
APIGenerator.prototype.files = function files() {
  if (this.abort) {
    return;
  }

  this.template('api.js', this.apiFile + '.js');

  if (this.dbOption === 'mongodb') {
    this.template('mongodb/api.controller.js', this.apiFile + '.controller.js');
    this.template('mongodb/api.model.js', this.apiFile + '.model.js');
  }
  // Default to SQL database
  else {
    this.template('sql/api.controller.js', this.apiFile + '.controller.js');
    this.template('sql/api.model.js', this.apiFile + '.model.js');
  }

  if (this.useServerTesting) {
    this.template('api.spec.js', this.testFile + '.spec.js');
  }

};
