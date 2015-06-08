// Configuration for LESS task(s)
// Compile LESS stylesheets to single `.css` file
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('less', {
    serve: {
      options: {
        paths: [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>'
        ],
        sourceMap: true,
        sourceMapFilename: '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.css.map',
        sourceMapBasepath: '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/',
        sourceMapRootpath: '',
        dumpLineNumbers: 'comments',
        outputSourceFiles: true
      },
      files: {
        '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/main.css':
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.less'
      }
    },
    build: {
      options: {
        paths: [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>'
        ],
        sourceMap: true,
        sourceMapFilename: '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.css.map',
        sourceMapBasepath: '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/',
        sourceMapRootpath: './',
        compress: true,
        outputSourceFiles: true
      },
      files: {
        '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles.replace(/^_/, "") %>/main.css':
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.styles %>/main.less'
      }
    }
  });

};

module.exports = taskConfig;
