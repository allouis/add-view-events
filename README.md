# add-view-events

Adds delegated event listeners to an element, optionally binding the callbacks to a context, allows for easy removal of event listeners on cleanup

```
npm install add-view-events
```

# Usage

```javascript
var addEvents = require('./add-view-events')

function SomeView() {
  this.el = document.createElement('div')
  this.removeEvents = addEvents(this.el, {
      'click button.some-class': this.shout
  }, this)
}

SomeView.prototype.shout = function() {
  alert(this.msg)
}

SomeView.prototype.remove = function() {
  this.removeEvents()
  this.el.remove()
}
``` 

# API 

## `addEvents(el, events[, context])`

Attach event listeners and returns a cleanup function. `el` should be an element, `events` should be an object with `'event elem.selector'` keys and function properties. 

The `context` argument is optional and will ensure callbacks are called with their context bound to `context`

