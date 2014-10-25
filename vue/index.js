/**
 * Created by azu on 2014/10/25.
 * LICENSE : MIT
 */
"use strict";
var Vue = require("vue");
var AppStore = require("../lib/stores/app-stores");
var AppAction = require("../lib/actions/app-actions");
var vue = new Vue({
    el: '#js-main',
    data: {
        users: AppStore.getUsers(),
        clicked: function (index) {
            AppAction.updateUser(index);
        },
        addUser: function () {
            AppAction.addUser({
                name: "tester",
                notify: false
            })
        }
    }
});

function onChange(users) {
    vue.$set(users, users);
}
AppStore.addChangeListener(function () {
    onChange(AppStore.getUsers());
});