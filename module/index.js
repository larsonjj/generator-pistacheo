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

var ModuleGenerator = module.exports = function ModuleGenerator() {
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

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

// Prompts
ModuleGenerator.prototype.ask = function ask() {

  var self = this;
  var done = this.async();
  var prompts = [{
    when: function() {
      return self.htmlOption === 'jade' || self.htmlOption === 'swig';
    },
    type: 'list',
    name: 'type',
    message: 'What type of module do you want to create?',
    choices: ['Page', 'Layout', 'Module'],
    filter: function(val) {
      var filterMap = {
        'Page': 'page',
        'Layout': 'layout',
        'Module': 'module'
      };

      return filterMap[val];
    }
  }, {
    when: function(answers) {
      return self.singlePageApplication;
    },
    name: 'moduleFile',
    message: 'Where would you like to create this module?',
    default: function(answers) {
      return yeogurtConf ? directories.source + '/' + directories.modules : directories.source + '/_modules';
    }
  }, {
    when: function(answers) {
      return answers.type === 'page';
    },
    name: 'moduleFile',
    message: 'Where would you like to create this module?',
    default: function(answers) {
      return yeogurtConf ? directories.source : directories.source;
    }
  }, {
    when: function(answers) {
      return answers.type === 'page';
    },
    name: 'useLayout',
    message: 'What layout would you like to extend from?',
    default: yeogurtConf ? directories.source + '/' + directories.layouts + '/base' : directories.source + '/_layouts/base'
  }, {
    when: function(answers) {
      return answers.type === 'module';
    },
    name: 'moduleFile',
    message: 'Where would you like to create this module?',
    default: function(answers) {
      return yeogurtConf ? directories.source + '/' + directories.modules : directories.source + '/_modules';
    }
  }, {
    when: function(answers) {
      return answers.type === 'layout';
    },
    name: 'moduleFile',
    message: 'Where would you like to create this module?',
    default: function(answers) {
      return yeogurtConf ? directories.source + '/' + directories.layouts : directories.source + '/_layouts';
    }
  }, {
    when: function() {
      return self.useServer;
    },
    name: 'generateFrontend',
    message: 'Would you like to generate src assets (JS, ' + self.cssOption.toUpperCase() + ') for this module?',
    type: 'confirm'
  }, {
    when: function(answers) {
      return self.jsFramework === 'angular';
    },
    name: 'moduleURL',
    message: 'URL of new module?',
    default: '/someurl'
  }];

  this.prompt(prompts, function(answers) {

    this.type = answers.type;
    this.useLayout = answers.useLayout ? answers.useLayout.replace(directories.source + '/', '') : false;

    this.generateFrontend = answers.generateFrontend;

    this.templateFile = path.join(
        answers.moduleFile,
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase())
      );

    this.packageFile = path.join(
        answers.moduleFile,
        this._.slugify(this.name.toLowerCase()),
        'package'
      );

    if (this.moduleLocation === 'server' && this.type === 'layout') {
      this.moduleFile = path.join(
        answers.moduleFile,
        this._.slugify(this.name.toLowerCase())
      );
    }
    else if (this.type === 'page') {
      this.moduleFile = path.join(
        answers.moduleFile,
        this._.slugify(this.name.toLowerCase()),
        'index'
      );
    }
    else {
      this.moduleFile = path.join(
        answers.moduleFile,
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase())
      );
    }

    // Get source directory
    if (this.type === 'layout') {
      this.rootDir = getDirCount(this.moduleFile.replace(directories.source + '/' + directories.layouts + '/', ''));
    }
    else {
      this.rootDir = getDirCount(this.moduleFile.replace(directories.source + '/', ''));
    }

    this.testFile = path.join(
        answers.moduleFile,
        this._.slugify(this.name.toLowerCase()),
        '__tests__',
        this._.slugify(this.name.toLowerCase())
      );

    this.dashFile = path.join(
        answers.moduleFile,
        this._.slugify(this.name.toLowerCase()),
        '__dash__',
        this._.slugify(this.name.toLowerCase()) + '.dash'
      );

    this.moduleURL = answers.moduleURL;

    this.htmlURL = path.join(
        answers.moduleFile.replace('src', ''),
        this._.slugify(this.name.toLowerCase()),
        this._.slugify(this.name.toLowerCase()),
        '.html'
      );

    done();
  }.bind(this));
};

ModuleGenerator.prototype.files = function files() {

  if (!this.singlePageApplication) {

    if (!this.useServer && this.moduleLocation !== 'server' || this.moduleLocation === 'server') {
      if (this.htmlOption === 'jade') {
        if (this.type === 'module') {
          this.template('module.jade', this.moduleFile + '.jade');
          if (this.useDashboard) {
            this.template('module.dash.jade', this.dashFile + '.jade');
            this.template('module.dash.json', this.dashFile + '.json');
          }
        }
        else if (this.type === 'layout') {
          this.template('module.layout.jade', this.moduleFile + '.jade');
          if (this.moduleLocation === 'server') {
            return;
          }
        }
        // Default to page type
        else {
          this.template('module.page.jade', this.moduleFile + '.jade');
          if (this.useDashboard) {
            this.template('module.dash.json', this.dashFile + '.json');
          }
        }
      }
      else if (this.htmlOption === 'swig') {
        if (this.type === 'module') {
          this.template('module.swig', this.moduleFile + '.swig');
          if (this.useDashboard) {
            this.template('module.dash.swig', this.dashFile + '.swig');
            this.template('module.dash.json', this.dashFile + '.json');
          }
        }
        else if (this.type === 'layout') {
          this.template('module.layout.swig', this.moduleFile + '.swig');
          if (this.moduleLocation === 'server') {
            return;
          }
        }
        // Default to page type
        else {
          this.template('module.page.swig', this.moduleFile + '.swig');
          if (this.useDashboard) {
            this.template('module.dash.json', this.dashFile + '.json');
          }
        }
      }

    }

    if (this.type === 'module' && (this.moduleLocation !== 'server' || this.generateFrontend)) {
      if (this.jsOption === 'browserify') {
        this.template('module.js', this.moduleFile.replace('server', 'src') + '.js');
        if (this.useTesting) {
          this.template('module.spec.js', this.testFile.replace('server', 'src') + '.spec.js');
        }
      }
    }

    if (this.moduleLocation === 'server') {
      this.template('server/package.json', this.packageFile + '.json');
      this.template('server/module.js', this.moduleFile + '.js');
      this.template('server/module.controller.js', this.moduleFile + '.controller.js');
      if (this.useServerTesting) {
        this.template('server/module.spec.js', this.testFile + '.spec.js');
      }
    }
  }
  else if (this.jsFramework === 'angular') {
    this.template('angular/module.js', this.moduleFile + '.js');
    this.template('angular/module.controller.js', this.moduleFile + '.controller.js');
    this.template('angular/module.html', this.moduleFile + '.html');

    if (this.useTesting) {
      this.template('angular/module.spec.js', this.testFile + '.controller.spec.js');
    }
  }
  else if (this.jsFramework === 'react') {
    if (this.useJsx) {
      this.template('react/module.jsx', this.moduleFile + '.jsx');
    }

    if (this.useTesting) {
      this.template('react/module.spec.js', this.testFile + '.spec.js');
    }
  }
  else if (this.jsFramework === 'marionette') {
    if (this.jsOption === 'browserify') {
      this.template('backbone/browserify/module.js', this.moduleFile + '.js');
      if (this.useTesting) {
        this.template('backbone/browserify/module.spec.js', this.testFile + '.spec.js');
      }
    }

    this.template('backbone/module.html', this.moduleFile + '.jst');
  }

  if (this.type !== 'page' && (this.moduleLocation !== 'server' || this.generateFrontend)) {
    if (this.cssOption === 'sass') {
      if (this.sassSyntax === 'sass') {
        this.template('module.css', this.moduleFile.replace('server', 'src') + '.sass');
      }
      else {
        this.template('module.css', this.moduleFile.replace('server', 'src') + '.scss');
      }
    }
    else if (this.cssOption === 'less') {
      this.template('module.css', this.moduleFile.replace('server', 'src') + '.less');
    }
    else if (this.cssOption === 'stylus') {
      this.template('module.css', this.moduleFile.replace('server', 'src') + '.styl');
    }
  }
};
