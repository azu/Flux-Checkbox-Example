/**
 * Created by azu on 2014/10/25.
 * LICENSE : MIT
 */
"use strict";

var AppConstants = require("../constants/app-constants");
var AppDispatcher = require("../dispatchers/app-dispatchers");
var EventEmitter = require("events").EventEmitter;
var merge = require('react/lib/merge');
var CHANGE_EVENT = "change";

var _users = [
    {
        id: 0,
        name: "Tom",
        notify: false
    }
];

function updateUser(index) {
    var user = _users[index];
    user.notify = !user.notify;
}
var AppStore = merge(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    getUsers: function () {
        return _users;
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action; // this is our action from handleViewAction
    switch (action.actionType) {
        case AppConstants.UPDATE_USER:
            updateUser(payload.action.index);
            break;
    }
    AppStore.emitChange();
    return true;
});
module.exports = AppStore;