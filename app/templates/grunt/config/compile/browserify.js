// Configuration for browserify task(s)
// Compiles JavaScript into single bundle file
'use strict';


var taskConfig = function(grunt) {

  // Load config for use with non-grunt logic
  var pistacheo = grunt.config.get('pistacheo');

  grunt.config.set('browserify', {
    serve: {
      options: {
        transform: [
          require('envify')
        ],
        browserifyOptions: {
          debug: true
        },
        watch: true
      },
      files: {
        '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.scripts.replace(/^_/, "") %>/main.js': [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.scripts %>/main.js'
        ]
      }
    },
    build: {
      options: {
        transform: [
          require('envify')
        ],
        browserifyOptions: {
          debug: true
        },
        preBundleCB: function(b) {
          // Minify code
          return b.plugin('minifyify', {
            map: 'main.js.map',
            output: pistacheo.directories.destination + '/' + pistacheo.directories.scripts.replace(/^_/, '') + '/main.js.map'
          });
        }
      },
      files: {
        '<%%= pistacheo.directories.destination %>/<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.scripts.replace(/^_/, "") %>/main.js': [
          '<%%= pistacheo.directories.source %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.scripts %>/main.js'
        ]
      }
    },<% if (useTesting) { %>
    test: {
      options: {
        transform: [
          require('envify')
        ],
        browserifyOptions: {
          debug: true
        },
        watch: true
      },
      files: {
        '<%%= pistacheo.directories.temporary %>/<%%= pistacheo.directories.public %>/<%%= pistacheo.directories.scripts.replace(/^_/, "") %>/bundle.js': [
          '<%%= pistacheo.directories.source %>/**/*.spec.js'
        ]
      }
    }<% } %>
  });

};

module.exports = taskConfig;
