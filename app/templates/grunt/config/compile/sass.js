// Configuration for Sass task(s)
// Compile Sass stylesheets to single `.css` file
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('sass', {
    serve: {
      options: {
        precision: 10,
        outputStyle: 'nested',
        sourceMap: true,
        includePaths: [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/'
        ]
      },
      files: {
        '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/main.css':
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.{scss,sass}'
      }
    },
    build: {
      options: {
        precision: 10,
        outputStyle: 'compressed',
        sourceMap: true,
        includePaths: [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/'
        ]
      },
      files: {
        '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/main.css':
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.{scss,sass}'
      }
    }
  });

};

module.exports = taskConfig;
