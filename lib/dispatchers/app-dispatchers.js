"use strict";
var Dispatcher = require("flux").Dispatcher;
var objectAssign = require('object-assign');

var AppDispatcher = objectAssign(new Dispatcher(), {
    handleViewAction: function (action) {
        console.log('action', action);
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        })
    }
});
module.exports = AppDispatcher;