// Configuration for Copy task(s)
// Copies specified folders/files to specified destination
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('copy', {
    serve: {
      files: [{
         expand: true,
          cwd: '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>',
          dest: '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/',
          src: [
            '**/*',
            '!**/\_*/**'<% if (htmlOption === 'swig') { %>,
            '!**/*.swig'<% } else if (htmlOption === 'jade') { %>,
            '!**/*.jade'<% } %>
          ]
        }]
    },
    build: {
      files: [{
        expand: true,
        cwd: '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>',
        dest: '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.public %>/',
        src: [
          '**/*',
          '!**/\_*/**',
          '!**/*.jade'
        ]
      }, {
        expand: true,
        cwd: './',
        dest: '<%%= pistacheo.directories.destination %>/',
        src: [
          '<%%= pistacheo.directories.source %>/**/*',
          '!<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**',
          'package.json',
          'pistacheo.conf.js'
        ]
      }]
    }
  });

};

module.exports = taskConfig;
