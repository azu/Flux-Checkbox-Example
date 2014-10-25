/**
 * Created by azu on 2014/10/25.
 * LICENSE : MIT
 */
"use strict";
// entry-point
var Ractive = require("ractive");
var AppStore = require("./lib/stores/app-stores");
var ractive = new Ractive({
    el: "js-main",
    template: require("fs").readFileSync(__filename + ".handlebars", "utf-8"),
    data: {
        users: AppStore.getUsers()
    },
    components: {
        user: require("./lib/components/app-view")
    }
});
function onChange(users){
    ractive.set("users", users);
}
AppStore.addChangeListener(function(){
    onChange(AppStore.getUsers());
});
