/**
 * Generate files specific to needed images
 */

'use strict';

var imageFiles = function imageFiles() {
  this.copy('src/public/_images/pistacheo-icon.png', 'src/public/_images/pistacheo-icon.png');
};

module.exports = imageFiles;
