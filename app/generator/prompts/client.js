/**
 * Create prompts for client info
 */

'use strict';

var clientPrompts = function clientPrompts() {
  if (this.existingConfig) {
    return;
  }

  var cb = this.async();

  this.log('\n---- ' + 'Client'.red.underline + ' ----\n');

  this.prompt([{
    type: 'list',
    name: 'htmlOption',
    message: 'Which ' + 'Server template library'.blue + ' would you like to use?',
    choices: ['Jade', 'Swig'],
    filter: function(val) {
      var filterMap = {
        'Jade': 'jade',
        'Swig': 'swig'
      };

      return filterMap[val];
    }
  }, {
    type: 'list',
    name: 'jsOption',
    message: 'Which ' + 'JavaScript module library'.blue + ' would you like to use?',
    choices: ['Browserify', 'Webpack'],
    filter: function(val) {
      var filterMap = {
        'Browserify': 'browserify',
        'Webpack': 'webpack'
      };

      return filterMap[val];
    }
  }, {
    type: 'list',
    name: 'cssOption',
    message: 'What would you like to use to ' + 'write styles'.blue + '?',
    choices: ['Sass', 'Less', 'Stylus'],
    filter: function(val) {
      var filterMap = {
        'Sass': 'sass',
        'Less': 'less',
        'Stylus': 'stylus'
      };

      return filterMap[val];
    }
  }, {
    when: function(answers) {
      return answers.cssOption === 'sass';
    },
    type: 'list',
    name: 'sassSyntax',
    message: 'What ' + 'Sass syntax'.blue + ' would you like to use ?',
    choices: ['Scss', 'Sass'],
    filter: function(val) {
      var filterMap = {
        'Scss': 'scss',
        'Sass': 'sass'
      };

      return filterMap[val];
    }
  }], function(answers) {
    this.clientPrompts = answers;

    cb();
  }.bind(this));
};

module.exports = clientPrompts;
