'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var getDirCount = require('../helpers/get-dir-count');
var path = require('path');
var yeogurtConf;

try {
  yeogurtConf = require(path.join(process.cwd(), './yeogurt.conf'));
  var directories = yeogurtConf.directories;
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
  this.jsFramework = fileJSON.jsFramework;
  this.singlePageApplication = fileJSON.singlePageApplication;
  this.jsOption = fileJSON.jsOption;
  this.jsTemplate = fileJSON.jsTemplate;
  this.cssOption = fileJSON.cssOption || 'css';
  this.sassSyntax = fileJSON.sassSyntax;
  this.testFramework = fileJSON.testFramework;
  this.useTesting = fileJSON.useTesting;
  this.useJsx = fileJSON.useJsx;
  this.htmlOption = fileJSON.htmlOption;
  this.useDashboard = fileJSON.useDashboard;
  this.useServer = fileJSON.useServer;
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
      return yeogurtConf ? directories.source : directories.source + '/pages';
    }
  }, {
    when: function(answers) {
      return answers.type === 'page';
    },
    name: 'useLayout',
    message: 'What layout would you like to extend from?',
    default: yeogurtConf ? directories.source + '/' + directories.layouts + '/base' : directories.source + '/layouts/base'
  }, {
    when: function() {
      return self.useServer;
    },
    name: 'generateFrontend',
    message: 'Would you like to generate src assets (JS, ' + self.cssOption.toUpperCase() + ') for this module?',
    type: 'confirm'
  }];

  this.prompt(prompts, function(answers) {

    this.type = answers.type;
    this.useLayout = answers.useLayout ? answers.useLayout.replace(directories.source + '/', '') : false;

    this.generateFrontend = answers.generateFrontend;

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

    if (this.moduleLocation === 'server' && this.type === 'layout') {
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

    // Get source directory
    if (this.type === 'layout') {
      this.rootDir = getDirCount(this.pageFile.replace(directories.source + '/' + directories.layouts + '/', ''));
    }
    else {
      this.rootDir = getDirCount(this.pageFile.replace(directories.source + '/', ''));
    }

    this.testFile = path.join(
        answers.pageFile,
        this._.slugify(this.name.toLowerCase()),
        '__tests__',
        this._.slugify(this.name.toLowerCase())
      );

    this.moduleURL = answers.moduleURL;

    this.htmlURL = path.join(
        answers.pageFile.replace('src', ''),
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase()),
        '.html'
      );

    done();
  }.bind(this));
};

PageGenerator.prototype.files = function files() {

  if (!this.singlePageApplication) {

    if (!this.useServer && this.moduleLocation !== 'server' || this.moduleLocation === 'server') {
      if (this.htmlOption === 'jade') {
        if (this.type === 'module') {
          this.template('module.jade', this.pageFile + '.jade');
          if (this.useDashboard) {
            this.template('module.dash.jade', this.dashFile + '.jade');
            this.template('module.dash.json', this.dashFile + '.json');
          }
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
          if (this.useDashboard) {
            this.template('module.dash.json', this.dashFile + '.json');
          }
        }
      }
      else if (this.htmlOption === 'swig') {
        if (this.type === 'module') {
          this.template('module.swig', this.pageFile + '.swig');
          if (this.useDashboard) {
            this.template('module.dash.swig', this.dashFile + '.swig');
            this.template('module.dash.json', this.dashFile + '.json');
          }
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
          if (this.useDashboard) {
            this.template('module.dash.json', this.dashFile + '.json');
          }
        }
      }

    }

    if (this.type === 'module' && (this.moduleLocation !== 'server' || this.generateFrontend)) {
      if (this.jsOption === 'browserify') {
        this.template('module.js', this.pageFile.replace('server', 'src') + '.js');
        if (this.useTesting) {
          this.template('module.spec.js', this.testFile.replace('server', 'src') + '.spec.js');
        }
      }
    }

    if (this.moduleLocation === 'server') {
      this.template('server/package.json', this.packageFile + '.json');
      this.template('server/module.js', this.pageFile + '.js');
      this.template('server/module.controller.js', this.pageFile + '.controller.js');
      if (this.useServerTesting) {
        this.template('server/module.spec.js', this.testFile + '.spec.js');
      }
    }
  }
  else if (this.jsFramework === 'angular') {
    this.template('angular/module.js', this.pageFile + '.js');
    this.template('angular/module.controller.js', this.pageFile + '.controller.js');
    this.template('angular/module.html', this.pageFile + '.html');

    if (this.useTesting) {
      this.template('angular/module.spec.js', this.testFile + '.controller.spec.js');
    }
  }
  else if (this.jsFramework === 'react') {
    if (this.useJsx) {
      this.template('react/module.jsx', this.pageFile + '.jsx');
    }

    if (this.useTesting) {
      this.template('react/module.spec.js', this.testFile + '.spec.js');
    }
  }
  else if (this.jsFramework === 'marionette') {
    if (this.jsOption === 'browserify') {
      this.template('backbone/browserify/module.js', this.pageFile + '.js');
      if (this.useTesting) {
        this.template('backbone/browserify/module.spec.js', this.testFile + '.spec.js');
      }
    }

    this.template('backbone/module.html', this.pageFile + '.jst');
  }

  if (this.type !== 'page' && (this.moduleLocation !== 'server' || this.generateFrontend)) {
    if (this.cssOption === 'sass') {
      if (this.sassSyntax === 'sass') {
        this.template('module.css', this.pageFile.replace('server', 'src') + '.sass');
      }
      else {
        this.template('module.css', this.pageFile.replace('server', 'src') + '.scss');
      }
    }
    else if (this.cssOption === 'less') {
      this.template('module.css', this.pageFile.replace('server', 'src') + '.less');
    }
    else if (this.cssOption === 'stylus') {
      this.template('module.css', this.pageFile.replace('server', 'src') + '.styl');
    }
  }
};
