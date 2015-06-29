'use strict';

// Configuration file(s)
var config = require('<%= rootDir %>pistacheo.conf');

// Libs
var path = require('path');
var request = require('supertest');

// Get Express bootstrap file
var server = require(path.join(config.directories.root, config.directories.source, 'server'));

describe('GET /<%= _.camelize(name.toLowerCase()) %>', function() {

  it('should respond with HTML', function(done) {
    request(server)
      .get('/<%= _.camelize(name.toLowerCase()) %>')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
