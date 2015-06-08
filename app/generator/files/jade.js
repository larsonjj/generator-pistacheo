/**
 * Generate files specific to the jade folder
 */

'use strict';

var jadeFiles = function jadeFiles() {
  if (this.htmlOption === 'jade') {
    this.template('src/layouts/base.jade', 'src/layouts/base.jade');
    this.template('src/public/_scripts/main.js', 'src/public/_scripts/main.js');
    this.template('src/pages/home/home.jade', 'src/pages/home/home.jade');
    this.template('src/modules/error/404.jade', 'src/modules/error/404.jade');
    this.template('src/modules/error/500.jade', 'src/modules/error/500.jade');
    this.template('src/modules/error/index.js', 'src/modules/error/index.js');
  }
};

module.exports = jadeFiles;
