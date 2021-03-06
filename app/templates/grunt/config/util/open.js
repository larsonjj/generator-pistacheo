// Configuration for Open task(s)
// Opens up default browser to specified URL
'use strict';

var taskConfig = function(grunt) {

  // Load config for use with non-grunt logic
  var pistacheo = grunt.config.get('pistacheo');
  var serverUrl = 'http://' + pistacheo.host + ':' + pistacheo.port + pistacheo.baseUrl;

  grunt.config.set('open', {
    serve: {
      url: serverUrl
    }
  });

};

module.exports = taskConfig;
