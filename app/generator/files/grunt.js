/**
 * Generate files specific to the grunt folder
 */

'use strict';

var taskFiles = function taskFiles() {

  // ========
  // Util
  // ========

  this.template('grunt/config/util/watch.js', 'grunt/config/util/watch.js');
  this.template('grunt/config/util/clean.js', 'grunt/config/util/clean.js');
  this.template('grunt/config/util/concurrent.js', 'grunt/config/util/concurrent.js');
  this.template('grunt/config/util/copy.js', 'grunt/config/util/copy.js');

  // Open (handles opening default web browser)
  this.template('grunt/config/util/open.js', 'grunt/config/util/open.js');

  // ========
  // Compile
  // ========

  if (this.cssOption === 'less') {
    this.template('grunt/config/compile/less.js', 'grunt/config/compile/less.js');
  }

  if (this.cssOption === 'sass') {
    this.template('grunt/config/compile/sass.js', 'grunt/config/compile/sass.js');
  }

  if (this.cssOption === 'stylus') {
    this.template('grunt/config/compile/stylus.js', 'grunt/config/compile/stylus.js');
  }

  // Browserify
  if (this.jsOption === 'browserify') {
    this.template('grunt/config/compile/browserify.js', 'grunt/config/compile/browserify.js');
  }

  // ========
  // Optimize
  // ========

  this.template('grunt/config/optimize/postcss.js', 'grunt/config/optimize/postcss.js');
  this.template('grunt/config/optimize/imagemin.js', 'grunt/config/optimize/imagemin.js');

  // ========
  // Server
  // ========

  this.template('grunt/config/server/express.js', 'grunt/config/server/express.js');
  this.template('grunt/config/server/env.js', 'grunt/config/server/env.js');

  // ========
  // Test
  // ========

  this.template('grunt/config/test/eslint.js', 'grunt/config/test/eslint.js');

  if (this.useServerTesting) {
    this.template('grunt/config/test/mochaTest.js', 'grunt/config/test/mochaTest.js');
  }

  if (this.useTesting) {
    this.template('grunt/config/test/karma.js', 'grunt/config/test/karma.js');
  }

  if (this.useE2e) {
    this.template('grunt/config/test/protractor.js', 'grunt/config/test/protractor.js');
  }

  // ========
  // Tasks
  // ========

  this.template('grunt/tasks/build.js', 'grunt/tasks/build.js');
  this.template('grunt/tasks/default.js', 'grunt/tasks/default.js');
  this.template('grunt/tasks/serve.js', 'grunt/tasks/serve.js');
  this.template('grunt/tasks/test.js', 'grunt/tasks/test.js');

  this.template('grunt/tasks/keepalive.js', 'grunt/tasks/keepalive.js');
  this.template('grunt/tasks/wait.js', 'grunt/tasks/wait.js');
};

module.exports = taskFiles;
