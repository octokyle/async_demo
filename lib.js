/*
  The file name in upstream version is t.js
*/
'use strict';

var moment = require('moment');

// Increase num with 1. Then return the result to async
exports.inc = function(num, callback, timeout) {

  timeout = timeout || 200;
  setTimeout( function() {
    callback(null, num + 1);
  }, timeout);
};

// return the obj to async 
exports.fire = function(obj, callback, timeout) {

  timeout = timeout || 200;
  setTimeout( function() {
    callback(null, obj);
  }, timeout);
};

// mock error. let the callbacks of async receive this error.
exports.err = function(errMsg, callback, timeout) {

  timeout = timeout || 200;
  setTimeout( function() {
    callback(errMsg);
  }, timeout);
};

// Encapsulate console.log() function. Add seconds to output. 
// This will be beneficial for users to see the time variance, which 
// is helpful for understanding async.
exports.log = function(msg, obj) {
  
  process.stdout.write(moment().format('ss.SSS') + '> ');
  if (obj !== undefined) {
    process.stdout.write(msg);
    console.log(obj);
  } else {
    console.log(msg);
  }
};


// Wait a few miliseconds
exports.wait = function(mills) {

  var now = new Date;
  while (new Date - now <= mills);
};
