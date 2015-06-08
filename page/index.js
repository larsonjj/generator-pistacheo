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

var PageGenerator = module.exports = function PageGenerator() {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  var fileJSON = this.config.get('config');

  // options
  this.projectName = fileJSON.projectName;
  this.jsOption = fileJSON.jsOption;
  this.cssOption = fileJSON.cssOption;
  this.sassSyntax = fileJSON.sassSyntax;
  this.testFramework = fileJSON.testFramework;
  this.useTesting = fileJSON.useTesting;
  this.htmlOption = fileJSON.htmlOption;
  this.useServerTesting = fileJSON.useServerTesting;

};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

// Prompts
PageGenerator.prototype.ask = function ask() {

  var self = this;
  var done = this.async();
  var prompts = [{
    name: 'pageFile',
    message: 'Where would you like to create this page?',
    default: function(answers) {
      return pistacheoConf ? path.join(directories.source, directories.pages) : 'src/pages';
    }
  }, {
    name: 'useLayout',
    message: 'What layout would you like to extend from?',
    default: pistacheoConf ? directories.source + '/' + directories.layouts + '/base' : directories.source + '/layouts/base'
  }];

  this.prompt(prompts, function(answers) {

    this.type = answers.type;
    this.useLayout = answers.useLayout ? answers.useLayout.replace(directories.source + '/', '') : false;

    this.templateFile = path.join(
        answers.pageFile,
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase())
      );

    this.packageFile = path.join(
        answers.pageFile,
        this._.slugify(this.name.toLowerCase()),
        'package'
      );

    if (this.type === 'layout') {
      this.pageFile = path.join(
        answers.pageFile,
        this._.slugify(this.name.toLowerCase())
      );
    }
    else if (this.type === 'page') {
      this.pageFile = path.join(
        answers.pageFile,
        this._.slugify(this.name.toLowerCase()),
        'index'
      );
    }
    else {
      this.pageFile = path.join(
        answers.pageFile,
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase())
      );
    }

    // Get root directory
    this.rootDir = getDirCount(this.pageFile);

    // Get source directory
    this.sourceDir = getDirCount(this.pageFile.replace(directories.source + '/', ''));

    this.testFile = path.join(
        answers.pageFile,
        this._.slugify(this.name.toLowerCase()),
        '__tests__',
        this._.slugify(this.name.toLowerCase())
      );

    this.moduleURL = answers.moduleURL;

    this.htmlURL = path.join(
        answers.pageFile.replace(directories.source, ''),
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase()),
        '.html'
      );

    done();
  }.bind(this));
};

PageGenerator.prototype.files = function files() {

  if (this.htmlOption === 'jade') {
    if (this.type === 'module') {
      this.template('module.jade', this.pageFile + '.jade');
    }
    else if (this.type === 'layout') {
      this.template('module.layout.jade', this.pageFile + '.jade');
      if (this.moduleLocation === 'server') {
        return;
      }
    }
    // Default to page type
    else {
      this.template('module.page.jade', this.pageFile + '.jade');
    }
  }
  else if (this.htmlOption === 'swig') {
    if (this.type === 'module') {
      this.template('module.swig', this.pageFile + '.swig');
    }
    else if (this.type === 'layout') {
      this.template('module.layout.swig', this.pageFile + '.swig');
      if (this.moduleLocation === 'server') {
        return;
      }
    }
    // Default to page type
    else {
      this.template('module.page.swig', this.pageFile + '.swig');
    }
  }

  this.template('server/module.js', this.pageFile + '.js');
  this.template('server/module.controller.js', this.pageFile + '.controller.js');
  if (this.useServerTesting) {
    this.template('server/module.spec.js', this.testFile + '.spec.js');
  }

};
