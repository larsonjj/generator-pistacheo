// Configuration for ESLint task(s)
// Runs ESLint on specified files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('eslint', {
    options: {
      configFile: '.eslintrc'
    },
    target: [
      'Gruntfile.js',
      'grunt/**/*.js',
      '<%%= pistacheo.directories.source %>/**/*.js',
      // Ignore an folder named 'vendor'
      '!<%%= pistacheo.directories.source %>/**/<%%= pistacheo.directories.vendor %>/**/*.js'
    ]
  });

};

module.exports = taskConfig;
