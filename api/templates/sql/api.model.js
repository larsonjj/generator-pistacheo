'use strict';

var <%= _.classify(name) %>Model = function(sequelize, Sequelize) {
  return sequelize.define('<%= _.classify(name) %>', {
    name: Sequelize.STRING,
    active: Sequelize.BOOLEAN
  });
};

module.exports = <%= _.classify(name) %>Model;
