'use strict';
<% if (testFramework === 'mocha') { %>
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
<% } %>
describe('Index Page', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./index.po');
  });

  it('should include welcome message', function() {
<% if (testFramework === 'mocha') { %>
    expect(page.h1El.getText()).to.eventually.equal('Welcome to Yeogurt!');
    expect(page.imgEl.getAttribute('src')).to.eventually.match(/\/images\/pistacheo\-swirl\.png/);
<% } else { %>
  expect(page.h1El.getText()).toBe('Welcome to Yeogurt!');
    expect(page.imgEl.getAttribute('src')).toMatch(/\/images\/pistacheo\-swirl\.png/);
<% } %>
  });

});

