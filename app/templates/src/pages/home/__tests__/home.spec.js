'use strict';

// Configuration file(s)
var config = require('../../../pistacheo.conf');

// Libs
var path = require('path');
var request = require('supertest');

// Get Express bootstrap file
var server = require(path.join(config.directories.root, config.directories.source, 'server'));

describe('GET /', function() {

  it('should respond with HTML', function(done) {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

});
