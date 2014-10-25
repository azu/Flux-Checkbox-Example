/**
 * Created by azu on 2014/10/25.
 * LICENSE : MIT
 */
"use strict";
var AppAction = require("../actions/app-actions");
var templateString = require("fs").readFileSync(__filename + ".handlebars", "utf-8");
var Ractive = require("ractive");
var UserComponent = Ractive.extend({
    template: templateString,
    init: function () {
        this.on('clicked', function (ev) {
            AppAction.updateUser(this.get("index"));
        });
    }
});
module.exports = UserComponent;