/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var createAppGenerator = require('../helpers/create-generator').createAppGenerator;

describe('Yeogurt generator using Default Configuration', function() {
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        return done(err);
      }

      this.app = createAppGenerator();

      done();
    }.bind(this));
  });

  it('Creates expected files', function(done) {
    var expected = [
      '.yo-rc.json',
      'README.md',
      '.editorconfig',
      'Gruntfile.js',
      'package.json',
      'config.json',
      '.editorconfig',
      'src/',
      'src/main.js',
      'src/images',
      'src/robots.txt',
      'src/favicon.ico',
      'grunt/',
      'grunt/config',
      'grunt/tasks',
      'grunt/config/util/clean.js',
      'grunt/config/util/copy.js',
      'grunt/config/server/express.js',
      'grunt/config/server/env.js',
      'grunt/config/optimize/htmlmin.js',
      'grunt/config/optimize/imagemin.js',
      'grunt/config/optimize/uglify.js',
      'grunt/config/optimize/usemin.js',
      'grunt/config/optimize/autoprefixer.js',
      'grunt/config/util/watch.js',
      'grunt/tasks/build.js',
      'grunt/tasks/default.js',
      'grunt/tasks/serve.js',
      'grunt/tasks/test.js'
    ];

    helpers.mockPrompt(this.app, {
      existingConfig: false
    });

    this.app.run([], function() {
      assert.file(expected);
      done();
    });
  });
});
