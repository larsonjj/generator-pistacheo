// `grunt serve`
// Starts up a development server that watches for local file changes
// and automatically reloads them to the browser.

'use strict';

var taskConfig = function(grunt) {
  grunt.registerTask('serve', 'Open a development server within your browser', function(target) {

    if (target === 'build') {
      return grunt.task.run(['build',
      'env:all', 'env:prod', 'express:build', 'open', 'keepalive']);
    }

    grunt.task.run([
      'clean:tmp',
      'env:all',
      'imagemin:serve',
      'copy:serve',
      'browserify:serve',<% if (cssOption === 'less') { %>
      'less:serve',<% } %><% if (cssOption === 'sass') { %>
      'sass:serve',<% } %><% if (cssOption === 'stylus') { %>
      'stylus:serve',<% } %>
      'postcss:serve'
    ]);

    if (target === 'nowatch') {
      return true;
    }

    grunt.task.run([
      'express:serve',
      'wait',
      'open'
    ]);

    return grunt.task.run(['watch']);
  });
};

module.exports = taskConfig;
