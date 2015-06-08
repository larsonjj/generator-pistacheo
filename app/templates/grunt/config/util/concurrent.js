// Configuration for Concurrent task(s)
// Runs tasks in parallel to speed up the build process
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('concurrent', {
    images: [
      'imagemin:build'
    ],
    compile: [<% if (cssOption === 'less') { %>
      'less:build',<% } %><% if (cssOption === 'sass') { %>
      'sass:build',<% } %><% if (cssOption === 'stylus') { %>
      'stylus:build',<% } %>
      'browserify:build'
    ]
  });

};

module.exports = taskConfig;
