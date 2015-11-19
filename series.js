/****************************************************************************************
 * NAME
 *     series(tasks, [callback])
 *
 * DESCRIPTION
 *     Runs the functions in the 'tasks' array in series, each one running once the 
 *     previous function has completed. If any functions in the series passes an eror to
 *     its callback, no more functions are run, and 'callback' is immediately called with
 *     the value of error. Ohterwise, 'callback' receives an array of results when 
 *     'tasks' have completed.
 *
 *     It is also possibel to use an object instead of an array. Each property will be 
 *     run as a function, and the results will be passed to the final 'callback' as an
 *     object instead of an array. This can be a more readable way of handling results
 *     from series.
 *
 * NOTE
 *     While many implementations preserve the order of object properties, the ECMAScript
 *     Language Specification explicitly states that "The mechanics and order of 
 *     enumberating the properties is not specified."
 * 
 *     So if you rely on the order in which your series of functions are executed, and 
 *     want this to work on all platforms, consider using an array.
 * 
 * ARGUMENTS
 *     'tasks' - An array orobject containing functions to run, each function is passed
 *     a 'callback(err, result)' it must call on completion with an eror 'err' (which 
 *     can be null) and an optional 'result' value.
 * 
 *     'callback(err, results)' - An optional callback to run once all the functions 
 *     have completed. This function gets a results array (or object) containing all
 *     the result arguments passed to the 'task' callbacks.
 *  
 ****************************************************************************************/
'use strict';

var async = require('async');
var lib = require('./lib');
var log = lib.log;

/**
 * CASE 1
 *
 * All functions execute one by one. the result will be merge to an array or object.
 * 
 **/
async.series([
    function(cb) { lib.inc(3, cb); },
    function(cb) { lib.inc(8, cb); },
    function(cb) { lib.inc(2, cb); }
], function(err, results) {
    log('1. err: ', err);
    log('1. results: ', results);
});

/*** Result of case 1 ***
04.133> 1.1 err: null
04.133> 1.1 results: [ 4, 9, 3 ]
*/

/**
 * CASE 2
 *
 * Error occurs halfway.
 **/
async.series([
    function(cb) { lib.inc(3, cb); },
    function(cb) { lib.err('error occurs halfway', cb); },
    function(cb) { lib.inc(8, cb); }
], function(err, results) {
    log('2. err: ', err);
    log('2. results: ', results);
});

/*** Result of case 2 ***
44.966> 2. err: error occurs halfway
44.981> 2. results: [ 4, undefined ]
*/

/**
 * CASE 3
 *
 * If the arguments are objects (JSON), the results will be objects too. 
 **/
async.series({
    a: function(cb) { lib.inc(3, cb); },
    b: function(cb) { lib.inc(8, cb); },
    c: function(cb) { lib.inc(2, cb); }
}, function(err, results) {
    log('3. err: ', err);
    log('3. results: ', results);
});

/*** Result of case 3 ***
17.332> 3. err: null
17.347> 3. results: { a: 4, b: 9, c: 3 }
*/