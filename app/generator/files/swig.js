/**
 * Generate files specific to the swig folder
 */

'use strict';

var swigFiles = function swigFiles() {
  if (this.htmlOption === 'swig') {
    this.template('src/layouts/base.swig', 'src/layouts/base.swig');
    this.template('src/public/_scripts/main.js', 'src/public/_scripts/main.js');
    this.template('src/pages/home/home.swig', 'src/pages/home/home.swig');
    this.template('src/modules/error/404.swig', 'src/modules/error/404.swig');
    this.template('src/modules/error/500.swig', 'src/modules/error/500.swig');
    this.template('src/modules/error/index.js', 'src/modules/error/index.js');
  }
};

module.exports = swigFiles;
