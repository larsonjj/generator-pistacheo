/*global describe, beforeEach, it*/
'use strict';

var path  = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var createAppGenerator = require('../../helpers/create-generator').createAppGenerator;
var createSubGenerator = require('../../helpers/create-generator').createSubGenerator;

describe('Model sub-generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator([], {path: '../../../../app'});

      done();
    }.bind(this));
  });

  describe('Create model files when using Backbone', function() {
    it('Handles defaults', function(done) {
      // Filename
      var model = 'mymodel';
      var filesToTest = [
        'src/' + model + '/__tests__/' + model + '.spec.js',
        'src/' + model + '/' + model + '.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'backbone',
        singlePageApplication: true,
        jsTemplate: 'underscore',
        jsOption: 'browserify',
        testFramework: 'jasmine'
      });
      this.app.run([], function() {
        createSubGenerator('model', model, {path: '../../../../'}, {
          // mock prompt data
          modelFile: 'src'
        }, function() {
          assert.file(filesToTest);
          done();
        });
      });
    });
    it('Handles defaults with no testing', function(done) {
      // Filename
      var model = 'mymodel';
      var filesToTest = [
        'src/' + model + '/' + model + '.js'
      ];
      var filesNotCreated = [
        'src/' + model + '/__tests__/' + model + '.spec.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'backbone',
        singlePageApplication: true,
        useTesting: false,
        jsTemplate: 'underscore',
        jsOption: 'browserify',
        testFramework: 'jasmine'
      });
      this.app.run([], function() {
        createSubGenerator('model', model, {path: '../../../../'}, {
          // mock prompt data
          modelFile: 'src'
        }, function() {
          assert.file(filesToTest);
          assert.noFile(filesNotCreated);
          done();
        });
      });
    });
    it('Handles defaults with Vanilla JS', function(done) {
      // Filename
      var model = 'mymodel';
      var fileContentToTest = [
        ['src/' + model + '/__tests__/' + model + '.spec.js', /describe/i],
      ];

      var fileContentThatShouldntExist = [
          ['src/' + model + '/' + model + '.js', /module\.exports/i],
          ['src/' + model + '/' + model + '.js', /define\(function\(require\)/i]
        ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'backbone',
        singlePageApplication: true,
        jsTemplate: 'underscore',
        jsOption: 'none',
        testFramework: 'jasmine'
      });
      this.app.run([], function() {
        createSubGenerator('model', model, {path: '../../../../'}, {
          // mock prompt data
          modelFile: 'src'
        }, function() {
          assert.fileContent(fileContentToTest);
          assert.noFileContent(fileContentThatShouldntExist);
          done();
        });
      });
    });
    it('Handles defaults with Browserify', function(done) {
      // Filename
      var model = 'mymodel';
      var fileContentToTest = [
        ['src/' + model + '/__tests__/' + model + '.spec.js', /describe/i],
        ['src/' + model + '/' + model + '.js', /module\.exports/i]
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'backbone',
        singlePageApplication: true,
        jsTemplate: 'underscore',
        jsOption: 'browserify',
        testFramework: 'jasmine'
      });
      this.app.run([], function() {
        createSubGenerator('model', model, {path: '../../../../'}, {
          // mock prompt data
          modelFile: 'src'
        }, function() {
          assert.fileContent(fileContentToTest);
          done();
        });
      });
    });
    it('Handles defaults with RequireJS', function(done) {
      // Filename
      var model = 'mymodel';
      var fileContentToTest = [
        ['src/' + model + '/__tests__/' + model + '.spec.js', /define\(function\(require\)/i],
        ['src/' + model + '/' + model + '.js', /define\(function\(require\)/i]
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'backbone',
        singlePageApplication: true,
        jsTemplate: 'underscore',
        jsOption: 'requirejs',
        testFramework: 'jasmine'
      });
      this.app.run([], function() {
        createSubGenerator('model', model, {path: '../../../../'}, {
          // mock prompt data
          modelFile: 'src'
        }, function() {
          assert.fileContent(fileContentToTest);
          done();
        });
      });
    });
    it('Non-backbone warning', function(done) {
      // Filename
      var model = 'mymodel';
      var filesToNotExist = [
        'src/' + model + '/__tests__/' + model + '.spec.js',
        'src/' + model + '/' + model + '.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'angular',
        singlePageApplication: true
      });
      this.app.run([], function() {
        createSubGenerator('model', model, {path: '../../../../'}, {
          // mock prompt data
          modelFile: 'src'
        }, function() {
          assert.noFile(filesToNotExist);
          done();
        });
      });
    });
  });
});
