// Configuration for Watch task(s)
// Runs specified tasks when file changes are detected
'use strict';

var taskConfig = function(grunt) {

  var config = {
    configFiles: {
      files: [
        'grunt/**/*.js',
        '*.{json,js}'
      ],
      options: {
        reload: true,
        interrupt: true
      },
      tasks: [
        'serve:nowatch'
      ]
    },
    images: {
      files: [
        '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.images %>/**/*.{jpg,jpeg,gif,png,svg}',
      ],
      tasks: [
        'newer:imagemin:serve'
      ]
    },
    copy: {
      files: [
        '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*',
        '!<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/\_*/**'<% if (htmlOption === 'swig') { %>,
        '!<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*.swig'<% } else if (htmlOption === 'jade') { %>,
        '!<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*.jade'<% } %>
      ],
      tasks: [
        'newer:copy:serve'
      ]
    },<% if (cssOption === 'sass') { %>
    sass: {
      files: ['<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*.{scss,sass}'],
      tasks: [
        'sass:serve',
        'autoprefixer:serve'
      ]
    },<% } %><% if (cssOption === 'less') { %>
    less: {
      files: ['<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*.less'],
      tasks: [
        'less:serve',
        'autoprefixer:serve'
      ]
    },<% } %><% if (cssOption === 'stylus') { %>
    stylus: {
      files: ['<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*.styl'],
      tasks: [
        'stylus:serve',
        'autoprefixer:serve'
      ]
    },<% } %>
    css: {
      files: [
        '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*.css'
      ],
      tasks: [
        'autoprefixer:serve'
      ]
    },
    js: {
      files: [
        '<%%= pistacheo.directories.source %>/**/*.js',
        '!<%%= pistacheo.directories.source %>/**/vendor/**/*.js'
      ],
      tasks: [
        'newer:eslint'
      ]
    },
    livereload: {
      options: {
        livereload: 35729
      },
      files: [
        '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/*.{ico,png,txt}',
        '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/**/*.{css,ttf,otf,woff,svg,eot}',
        '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/**/*.js',
        '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
      ]
    },
    express: {
      files: [
        '<%%= pistacheo.directories.source %>/server.js',
        '<%%= pistacheo.directories.source %>/**/*.{js,json,html}'<% if (htmlOption === 'swig') { %>,
        '<%%= pistacheo.directories.source %>/**/*.swig'<% } %><% if (htmlOption === 'jade') { %>,
        '<%%= pistacheo.directories.source %>/**/*.jade'<% } %>
      ],
      tasks: [
        'express:serve',
        'wait'
      ],
      options: {
        livereload: true,
        nospawn: true // Without this option specified express won't be reloaded
      }
    }
  };

  grunt.config.set('watch', config);

};

module.exports = taskConfig;
