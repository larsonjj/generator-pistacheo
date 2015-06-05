/**
 * Generate logo prompt
 */

'use strict';

var logoPrompt = function logoPrompt() {
  var pistacheoLogo = '' +
    '       _     _             _                \n'.green +
    '      (_)   | |           | | '.green + 'Welcome to'.red + '              \n'.green +
    ' _ __  _ ___| |_ __ _  ___| |__   ___  ___  \n'.green +
    '|  _  \| / __| __/ _` |/ __| \'_ \\ / _ \\/ _ \\ \n'.green +
    '| |_) | \\__ \\ || (_| | (__| | | |  __/ (_) |\n'.green +
    '| .__/|_|___/\\__\\__,_|\\___|_| |_|\\___|\\___/ \n'.green +
    '| |                                         \n'.green +
    '|_|                                         \n'.green;

  // have Yeogurt greet the user.
  this.log(pistacheoLogo);
};

module.exports = logoPrompt;
