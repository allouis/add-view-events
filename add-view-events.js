(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.addViewEvents = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var deligate = require('deligate')

// sourced from http://www.w3.org/TR/DOM-Level-3-Events/#event-types-list
var non_bubble_phase_events = [
    'abort',
    'blur',
    'error',
    'focus',
    'load',
    'mouseenter',
    'mouseleave',
    'resize',
    'scroll',
    'unload'
]

function addEvents(el, events, context) {

    var eventDescriptions = Object.keys(events).map(function(key){
        var eventName = key.split(' ')[0]
        var handler = deligate(key.split(' ')[1], events[key])
        if (context) handler = handler.bind(context)

        var capture = non_bubble_phase_events.indexOf(eventName) != -1
        el.addEventListener(eventName, handler, capture)

        return {
            eventName: eventName,
            handler: handler
        }
    })

    return function removeEvents(){
        eventDescriptions.forEach(function(desc){
            var capture = non_bubble_phase_events.indexOf(desc.eventName) != -1
            el.removeEventListener(desc.eventName, desc.handler, capture)
        })
    }

}

module.exports = addEvents

},{"deligate":2}],2:[function(require,module,exports){
var selector_error = 'deligate must be passed a string for the selector'
var handler_error = 'deligate must be passed a function for the handler'

function deligate(selector, handler) {
    if (typeof selector != 'string') throw new Error(selector_error)
    if (typeof handler != 'function') throw new Error(handler_error)
    return function deligated(event) {
        if (event.target.matches(selector)) {
            return handler.call(this, event)
        }
    }
}

module.exports = exports = deligate

},{}]},{},[1])(1)
});