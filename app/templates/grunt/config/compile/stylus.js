// Configuration for Stylus task(s)
// Compile Stylus stylesheets to single `.css` file
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('stylus', {
    serve: {
      options: {
        compress: false,
        sourcemap: {
          inline: true
        },
        paths: [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>'
        ]
      },
      files: {
        '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/main.css':
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.styl'
      }
    },
    build: {
      options: {
        compress: true,
        sourcemap: false, // external sourcemap not supported yet
        paths: [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/'
        ]
      },
      files: {
        '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/main.css':
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.styl'
      }
    }
  });

};

module.exports = taskConfig;
