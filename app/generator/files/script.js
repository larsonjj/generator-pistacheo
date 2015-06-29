/**
 * Generate files specific to needed images
 */

'use strict';

var scriptFiles = function scriptFiles() {
  this.copy('src/public/_scripts/main.js', 'src/public/_scripts/main.js');
};

module.exports = scriptFiles;
