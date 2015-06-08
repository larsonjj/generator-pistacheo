// Configuration for ImageMin task(s)
// Compresses jpg, jpeg, png, and svg files
'use strict';

var pngquant = require('imagemin-pngquant');
var svgo = require('imagemin-svgo');

var taskConfig = function(grunt) {

  grunt.config.set('imagemin', {
    serve: {
      options: {
        use: [pngquant({quality: '65-80', speed: 10}), svgo()]
      },
      files: [{
        expand: true,
        cwd: '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.images %>',
        src: '**/*.{jpg,jpeg,gif,png,svg}',
        dest: '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.images.replace(/^_/, "") %>'
      }]
    },
    build: {
      options: {
        use: [pngquant({quality: '65-80', speed: 4}), svgo()]
      },
      files: [{
        expand: true,
        cwd: '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.images %>',
        src: '**/*.{jpg,jpeg,gif,png,svg}',
        dest: '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.images.replace(/^_/, "") %>'
      }]
    }
  });

};

module.exports = taskConfig;
