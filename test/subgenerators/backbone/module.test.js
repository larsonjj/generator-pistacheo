/*global describe, beforeEach, it*/
'use strict';

var path  = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var createAppGenerator = require('../../helpers/create-generator').createAppGenerator;
var createSubGenerator = require('../../helpers/create-generator').createSubGenerator;

describe('Backbone module sub-generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator([], {path: '../../../../app'});

      done();
    }.bind(this));
  });

  describe('Create module files when using Backbone', function() {
    it('Without testing', function(done) {
      // Filename
      var module = 'mymodule';
      var filesNotCreated = [
        'src/' + module + '/__tests__/' + module + '.controller.spec.js'
      ];

      helpers.mockPrompt(this.app, {
        jsFramework: 'backbone',
        singlePageApplication: true,
        useTesting: false,
        jsTemplate: 'underscore',
        jsOption: 'browserify',
        testFramework: 'jasmine',
        useServer: false
      });
      this.app.run([], function() {
        createSubGenerator('module', module, {path: '../../../../'}, {
          // mock prompt data
          moduleFile: 'src'
        }, function() {
          assert.noFile(filesNotCreated);
          done();
        });
      });
    });
    describe('Handles defaults with Underscore', function() {
      describe('Using Browserify', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js',
            'src/' + module + '/' + module + '.jst',
            'src/' + module + '/' + module + '.scss'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.jst', /<div>/i],
            ['src/' + module + '/' + module + '.js', /module\.exports/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'underscore',
            jsOption: 'browserify',
            testFramework: 'jasmine',
            cssOption: 'sass',
            sassSyntax: 'scss',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js',
            'src/' + module + '/' + module + '.jst',
            'src/' + module + '/' + module + '.scss'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.jst', /<div>/i],
            ['src/' + module + '/' + module + '.js', /module\.exports/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'underscore',
            jsOption: 'browserify',
            testFramework: 'mocha',
            cssOption: 'sass',
            sassSyntax: 'scss',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
      describe('Using RequireJS', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'underscore',
            jsOption: 'requirejs',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'underscore',
            jsOption: 'requirejs',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
      describe('Using VanillaJS', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'underscore',
            jsOption: 'none',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'underscore',
            jsOption: 'none',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
    });
    describe('Handles defaults with Handlebars', function() {
      describe('Using Browserify', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js',
            'src/' + module + '/' + module + '.hbs'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /module\.exports/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'handlebars',
            jsOption: 'browserify',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js',
            'src/' + module + '/' + module + '.hbs'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /module\.exports/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'handlebars',
            jsOption: 'browserify',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
      describe('Using RequireJS', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'handlebars',
            jsOption: 'requirejs',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'handlebars',
            jsOption: 'requirejs',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
      describe('Using VanillaJS', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'handlebars',
            jsOption: 'none',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'handlebars',
            jsOption: 'none',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
    });
    describe('Handles defaults with Jade', function() {
      describe('Using Browserify', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js',
            'src/' + module + '/' + module + '.jade'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /module\.exports/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'jade',
            jsOption: 'browserify',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js',
            'src/' + module + '/' + module + '.jade'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /module\.exports/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'jade',
            jsOption: 'browserify',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
      describe('Using RequireJS', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'jade',
            jsOption: 'requirejs',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/' + module + '.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /define\(function\(require\)/i],
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'jade',
            jsOption: 'requirejs',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
      describe('Using VanillaJS', function() {
        it('Using Jasmine', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/__tests__/' + module + '.spec.js', /toBe/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'jade',
            jsOption: 'none',
            testFramework: 'jasmine',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
        it('Using Mocha', function(done) {
          // Filename
          var module = 'mymodule';
          var filesToTest = [
            'src/' + module + '/' + module + '.js',
            'src/' + module + '/__tests__/' + module + '.spec.js'
          ];

          var fileContentToTest = [
            ['src/' + module + '/__tests__/' + module + '.spec.js', /to\.exist/i]
          ];

          helpers.mockPrompt(this.app, {
            jsFramework: 'backbone',
            singlePageApplication: true,
            jsTemplate: 'jade',
            jsOption: 'none',
            testFramework: 'mocha',
            useServer: false
          });
          this.app.run([], function() {
            createSubGenerator('module', module, {path: '../../../../'}, {
              // mock prompt data
              moduleFile: 'src'
            }, function() {
              assert.file(filesToTest);
              assert.fileContent(fileContentToTest);
              done();
            });
          });
        });
      });
    });
  });
});
