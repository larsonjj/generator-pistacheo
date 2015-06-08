/**
 * Generate files specific to the styles folder
 */

'use strict';

var styleFiles = function styleFiles() {
  if (this.cssOption === 'less') {
    this.template('src/public/_styles/main.less', 'src/public/_styles/main.less');
  }
  if (this.cssOption === 'sass') {
    if (this.sassSyntax === 'sass') {
      this.template('src/public/_styles/main.sass', 'src/public/_styles/main.sass');
    }
    else {
      this.template('src/public/_styles/main.scss', 'src/public/_styles/main.scss');
    }
  }
  if (this.cssOption === 'stylus') {
    this.template('src/public/_styles/main.styl', 'src/public/_styles/main.styl');
  }
};

module.exports = styleFiles;
