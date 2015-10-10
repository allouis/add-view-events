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
            var capture = non_bubble_phase_events.indexOf(eventName) != -1
            el.removeEventListener(desc.eventName, desc.handler, capture)
        })
    }

}

module.exports = addEvents
