/****************************************************************************************
 * NAME
 *     waterfall(tasks, [callback])
 *
 * DESCRIPTION
 *     Runs the 'tasks' array of functions in series, each passing their results 
 *     to the next in the array. However, if any of the 'tasks' pass an error to 
 *     their own callback, the next function is not executed, and the main 'callback' 
 *     is immediately called with the error.
 *
 * ARGUMENTS
 * 	   'tasks' - An array of functions to run, each functions is passed a 
 *     'callback(err, result1, result2, ...)' it must call on completion.
 *     The first argument is an error (which can be 'null') and any further arguments 
 *     will be passed as arguments in order to the next task.
 * 
 *     'callback(err, [results])' - An optional callback to run once all the functions 
 *     have completed. This will be passed the results of the last task's callback.
 *  
 ****************************************************************************************/
'use strict';

var async = require('async');
var lib = require('./lib');
var log = lib.log;

/**
 * CASE 1
 *
 * All functions execute correctly. The result of each function will be
 * the parameter of next function.
 * 
 * All 'callback' should in the form of 'callback(err, result)'. But you don't 
 * need to declare the err parameter, it is processed automatically.
 **/
async.waterfall([
	function(cb) { log('1.1: start'); cb(null, 5); },
	function(n, cb) { log('1.2: ', n); lib.inc(n, cb); },
	function(n, cb) { log('1.3: ', n); lib.fire(n * n, cb); }
], function(err, result) {
	log('1. err: ', err);
    log('1. result: ', result);
});

/*** Result of case 1 ***
26.008> 1.1: start
26.023> 1.2: 5
26.226> 1.3: 6
26.429> 1. err: null
26.429> 1. result: 36
*/

/**
 * CASE 2
 *
 * Error occurs halfway.
 **/
async.waterfall([
	function(cb) { log('2.1: start'); cb(null, 3); },
	function(n, cb) { log('2.2: ', n); lib.inc(n, cb); },
	function(n, cb) { log('2.3: ', n); lib.err('error occurs halfway', cb); },
	function(n, cb) { log('2.4: ', n); lib.fire(n, cb); }
], function(err, result) {
	log('2 err: ', err);
    log('2 result: ', result);
});

/*** Result of case 2 ***
51.219> 2.1: start
51.235> 2.2: 3
51.438> 2.3: 4
51.640> 2 err: error occurs halfway
51.640> 2 result:
*/

/**
 * CASE 3
 *
 * async.waterfall() does not accept json-format tasks.
 **/
async.waterfall({
 	a: function(cb) { log('3.1: start'); cb(null, 3); },
 	b: function(n, cb) { log('3.2: ', n); lib.inc(n, cb); },
 	c: function(n, cb) { log('3.3: ', n); lib.fire(n*n, cb); }
}, function(err, result) {
	log('3 err: ', err);
    log('3 result: ', result);
});

/*** Result of case 3 ***
17.560> 3 err: [Error: First argument to waterfall must be an array of functions]
17.560> 3 result:
*/
