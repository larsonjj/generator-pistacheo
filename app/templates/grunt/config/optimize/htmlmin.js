// Configuration for HTMLMin task(s)
// Minifies HTML files
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('htmlmin', {
    build: {
      options: {
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true
      },
      files: [{
        expand: true,
        cwd: '<%%= yeogurt.directories.destination %>/',
        src: [
          '**/*.html'
        ],
        dest: '<%%= yeogurt.directories.destination %>/'
      }]
    }
  });

};

module.exports = taskConfig;
