// Configuration for Autoprefixer task(s)
// Automatically adds vendor prefixes to stylesheets if they are needed
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('postcss', {
    serve: {
      options: {
        // Target browsers IE9 and up
        processors: [
        require('autoprefixer-core')({browsers: 'ie >= 9'})
      ],
        map: true
      },
      files: [{
        expand: true,
        flatten: true,
        src: '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/**/*.css',
        dest: '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/'
      }]
    },
    build: {
      options: {
        processors: [
        require('autoprefixer-core')({browsers: 'ie >= 9'})
      ],
        map: true
      },
      files: [{
        expand: true,
        flatten: true,
        src: '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/**/*.css',
        dest: '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/'
      }]
    }
  });

};

module.exports = taskConfig;
