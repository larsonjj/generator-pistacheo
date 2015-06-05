/**
 * Generate logo prompt
 */

'use strict';

var logoPrompt = function logoPrompt() {
  var pistacheoLogo = '' +
    '             _             _                ' +
    '      (_)   | |           | |               ' +
    ' _ __  _ ___| |_ __ _  ___| |__   ___  ___  ' +
    '|  _ \| / __| __/ _` |/ __| \'_ \ / _ / _ \\ ' +
    '| |_) | \\__ \\ || (_| | (__| | | |  __/ (_) |' +
    '| .__/|_|___/\\__\\__,_|\\___|_| |_|\\___|\\___/ ' +
    '| |                                         ' +
    '|_|                                         ';

  // have Yeogurt greet the user.
  this.log(pistacheoLogo);
};

module.exports = logoPrompt;
