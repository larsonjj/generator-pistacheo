'use strict';

var index = function(req, res) {
  res.render('app/home/home', {
    title: 'Home',
    env: process.env.NODE_ENV || 'development'
  });
};

module.exports = {
  index: index
};
