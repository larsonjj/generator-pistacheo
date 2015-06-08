// Configuration for Mocha Test task(s)
// Handles server side tests
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('mochaTest', {
    options: {
      reporter: 'spec'
    },
    src: ['<%%= pistacheo.directories.source %>/**/*.spec.js']
  });

};

module.exports = taskConfig;
