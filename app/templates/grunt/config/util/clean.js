// Configuration for Clean task(s)
// Deletes specified folders/files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('clean', {
    build: ['<%%= pistacheo.directories.destination %>'],
    tmp: ['<%%= pistacheo.directories.temporary %>']
  });

};

module.exports = taskConfig;
