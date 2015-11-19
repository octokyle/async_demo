/****************************************************************************************
 * NAME
 *     compose(fn1, fn2...)
 *     seq(fn1, fn2...)
 *
 * DESCRIPTION
 *     Creates a function which is a composition of the passed asynchronous functions.
 *     Each function consumes the return value of the function that follows. Composing
 *     functions f(), g() and h() would produce the result of 'f(g(h()))', only this
 *     version uses callbacks to obtain the return values.
 *
 *     Each function is executed with the 'this' binding of the composed function.
 * 
 *     seq() is an alternate for compose() which is more natural to read. Each function
 *     consumes the return value of the previous function. It is the equivalent of 
 *     'compose' with the arguments reversed.
 *     
 *
 * ARGUMENTS
 *     'functions...' - the asynchronous functions to compose.
 *  
 ****************************************************************************************/
'use strict';

var async = require('async');
var lib = require('./lib');
var log = lib.log;

function add2(n, callback) {
    setTimeout(function() {
        callback(null, n + 2);
    }, 10);
}

function sub1(n, callback) {
    setTimeout(function() {
        callback(null, n - 1);
    }, 10);
}

function mul2(n, callback) {
    setTimeout(function() {
        callback(null, n * 2);
    }, 10);
}

var add2sub1mul2 = async.compose(mul2, sub1, add2);

add2sub1mul2(4, function(err, result) {
    log('1. err: ', err);
    log('1. compose result: ', result);
});

var fgh = async.seq(add2, sub1, mul2);

fgh(4, function(err, result) {
    log('2. err', err);
    log('2. seq result: ', result);
});