/**
 * Generate files specific to the server folder
 */

'use strict';

var nodeFiles = function nodeFiles() {
  if (this.dbOption === 'mongodb') {
    this.template('src/config/mongodb/database.js', 'src/config/database.js');
    this.template('src/server.mongodb.js', 'src/server.js');
  }
  if (this.dbOption === 'sql') {
    this.template('src/config/sql/database.js', 'src/config/database.js');
    this.template('src/server.sql.js', 'src/server.js');
  }
  else {
    this.template('src/server.nodb.js', 'src/server.js');
  }

  this.template('src/config/express.js', 'src/config/express.js');
  this.template('src/config/secrets.js', 'src/config/secrets.js');

  this.template('src/config/env/development.js', 'src/config/env/development.js');
  this.template('src/config/env/production.js', 'src/config/env/production.js');
  this.template('src/config/env/test.js', 'src/config/env/test.js');

  this.template('src/routes.js', 'src/routes.js');

  this.template('src/pages/home/index.js', 'src/pages/home/index.js');
  this.template('src/pages/home/home.controller.js', 'src/pages/home/home.controller.js');
};

module.exports = nodeFiles;
