var test = require('tape')
var addEvents = require('../')

test('it exports a function', function(t){
    t.equals(typeof addEvents, 'function', 'add-view-events exports a function');
    t.end();
})
