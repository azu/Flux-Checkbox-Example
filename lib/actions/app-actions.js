/**
 * Created by azu on 2014/10/25.
 * LICENSE : MIT
 */
"use strict";
var AppConstants = require("../constants/app-constants");
var AppDispatcher = require("../dispatchers/app-dispatchers");

var AppActions = {
    updateUser: function (index) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.UPDATE_USER,
            index: index
        });
    },
    addUser: function (user) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_USER,
            user: user
        });
    }

};

module.exports = AppActions;