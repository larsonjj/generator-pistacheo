/**
 * Generate files specific to the root directory
 */

'use strict';

var rootFiles = function rootFiles() {
  // Create needed Directories

  // root (/)
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('pistacheo.conf.js', 'pistacheo.conf.js');
  this.template('README.md', 'README.md');

  if (this.versionControl === 'svn') {
    this.copy('svn-init.sh', 'svn-init.sh');
    this.copy('svn-init.bat', 'svn-init.bat');
  }

  if (this.versionControl === 'git') {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  }
  else if (this.versionControl === 'svn') {
    this.copy('svnignore', '.svnignore');
  }

  this.copy('src/public/robots.txt', 'src/robots.txt');
  this.copy('src/public/favicon.ico', 'src/favicon.ico');

  this.copy('editorconfig', '.editorconfig');
  this.template('eslintrc', '.eslintrc');

};

module.exports = rootFiles;
