// Database Configuration

'use strict';

// Configuration file(s)
var config = require('../../pistacheo.conf');

// Libs
var Sequelize = require('sequelize');

var db = {};

// Connect to database
var sequelize = new Sequelize(config.database.url, config.database.options);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
