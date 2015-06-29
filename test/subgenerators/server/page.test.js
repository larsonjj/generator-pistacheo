/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var createAppGenerator = require('../../helpers/create-generator').createAppGenerator;
var createSubGenerator = require('../../helpers/create-generator').createSubGenerator;

describe('Server page sub-generator', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator([], {path: '../../../../app'});

      done();
    }.bind(this));
  });

  describe('Create page files when using Static Jade', function() {
    describe('Server pages', function() {
      it('Handles defaults', function(done) {
        // Filename
        var page = 'mypage';

        var filesToTest = [
          // add files and folders you expect to NOT exist here.
          'src/pages/' + page + '/index.js',
          'src/pages/' + page + '/__tests__/' + page + '.spec.js',
          'src/pages/' + page + '/' + page + '.controller.js',
          'src/pages/' + page + '/' + page + '.jade',
          'src/pages/' + page + '/__tests__/' + page + '.spec.js'
        ];

        helpers.mockPrompt(this.app, {
          htmlOption: 'jade',
          singlePageApplication: false,
          useServer: true
        });
        this.app.run([], function() {
          createSubGenerator('page', page, {path: '../../../../'}, {
            // mock prompt data
            pageFile: 'src/pages',
            type: 'page',
            generateFrontend: true
          }, function() {
            assert.file(filesToTest);
            done();
          });
        });
      });
    });
  });

  describe('Create page files when using Static Swig', function() {
    describe('Server pages', function() {
      it('Handles defaults', function(done) {
        // Filename
        var page = 'mypage';

        var filesToTest = [
          // add files and folders you expect to NOT exist here.
          'src/pages/' + page + '/index.js',
          'src/pages/' + page + '/' + page + '.controller.js',
          'src/pages/' + page + '/' + page + '.swig',
          'src/pages/' + page + '/__tests__/' + page + '.spec.js'
        ];

        helpers.mockPrompt(this.app, {
          htmlOption: 'swig',
          singlePageApplication: false,
          useServer: true
        });
        this.app.run([], function() {
          createSubGenerator('page', page, {path: '../../../../'}, {
            // mock prompt data
            pageFile: 'src/pages',
            type: 'page'
          }, function() {
            assert.file(filesToTest);
            done();
          });
        });
      });
    });
  });
});
