// `grunt test`
// Runs all tests and static analysis (i.e. JSHint)

'use strict';

var taskConfig = function(grunt) {
  grunt.registerTask('test', 'Peform tests on JavaScript', function(target) {<% if (useE2e) { %>

    if (target === 'e2e') {
      grunt.task.run([
        'serve:nowatch',
        'express:serve',
        'protractor',
        'clean:tmp'
      ]);
    }<% } %><% if (useServerTesting) { %>

    if (target === 'server') {
      grunt.task.run([
        'env:all',
        'env:test',
        'mochaTest'
      ]);
    }<% } %>

    if (!target || target === 'client') {
      grunt.task.run([
        'eslint'<% if (useTesting) { %>,
        'browserify:test'<% } %>
      ]);<% if (useTesting) { %>

      if (grunt.option('watch')) {
        grunt.task.run(['karma:unitWatch']);
      }
      else {
        grunt.task.run(['karma:unit']);
      }

      // Clean up temp files
      grunt.task.run([
        'clean:tmp'
      ]);<% } %>
    }
  });
};

module.exports = taskConfig;
