/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var createAppGenerator = require('../helpers/create-generator').createAppGenerator;

describe('Yeogurt generator using Server', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator();

      done();
    }.bind(this));
  });
  describe('With Defaults', function() {
    it('Creates expected files', function(done) {
      var expected = [
        'grunt/config/util/open.js',
        'grunt/config/server/express.js',
        'grunt/config/server/env.js',
        'src/pages/home/index.js',
        'src/pages/home/home.controller.js',
        'src/config/express.js',
        'src/config/env',
        'src/config/env/development.js',
        'src/config/env/production.js',
        'src/server.js'
      ];

      helpers.mockPrompt(this.app, {
        useServer: true,
        dbOption: 'none'
      });
      this.app.run([], function() {
        assert.file(expected);
        done();
      });
    });
  });
  describe('With MongoDB Database', function() {
    it('Creates expected files', function(done) {
      var expected = [
        'src/config/database.js'
      ];
      var fileContentToTest = [
        ['src/config/database.js', /mongoose/i]
      ];

      helpers.mockPrompt(this.app, {
        dbOption: 'mongodb',
        dbType: 'mongodb',
        useServer: true
      });
      this.app.run([], function() {
        assert.file(expected);
        assert.fileContent(fileContentToTest);
        done();
      });
    });
  });
  describe('With MySQL Database', function() {
    it('Creates expected files', function(done) {
      var expected = [
        'src/config/database.js'
      ];
      var fileContentToTest = [
        ['src/config/database.js', /sequelize/i]
      ];

      helpers.mockPrompt(this.app, {
        dbOption: 'sql',
        dbType: 'mysql',
        useServer: true
      });
      this.app.run([], function() {
        assert.file(expected);
        assert.fileContent(fileContentToTest);
        done();
      });
    });
  });
  describe('With Static Jade', function() {
    it('Creates expected files', function(done) {
      var expected = [
        'src/modules/error/404.jade',
        'src/modules/error/500.jade',
        'src/modules/error/index.js',
        'src/layouts/base.jade',
        'src/pages/home/home.jade'
      ];
      var expectedContent = [
        ['src/pages/home/index.js', /router\.get\('\/'/i]
      ];

      helpers.mockPrompt(this.app, {
        singlePageApplication: false,
        htmlOption: 'jade',
        useServer: true
      });
      this.app.run([], function() {
        assert.file(expected);
        assert.fileContent(expectedContent);
        done();
      });
    });
  });
  describe('With Static Swig', function() {
    it('Creates expected files', function(done) {
      var expected = [
        'src/modules/error/404.swig',
        'src/modules/error/500.swig',
        'src/modules/error/index.js',
        'src/routes.js',
        'src/layouts/base.swig',
        'src/pages/home/home.swig'
      ];
      var expectedContent = [
        ['src/pages/home/index.js', /router\.get\('\/'/i]
      ];

      helpers.mockPrompt(this.app, {
        singlePageApplication: false,
        htmlOption: 'swig',
        useServer: true
      });
      this.app.run([], function() {
        assert.file(expected);
        assert.fileContent(expectedContent);
        done();
      });
    });
  });
  describe('With Cookie Sessions', function() {
    it('Creates expected files', function(done) {
      var expected = [
        'src/config/secrets.js'
      ];
      var fileContentToTest = [
        ['src/config/express.js', /app.use\(session\(\{/i]
      ];

      helpers.mockPrompt(this.app, {
        useServer: true
      });
      this.app.run([], function() {
        assert.file(expected);
        assert.fileContent(fileContentToTest);
        done();
      });
    });
  });
});
