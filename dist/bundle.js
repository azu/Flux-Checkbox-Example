webpackJsonp([1],[
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	// entry-point
	var Ractive = __webpack_require__(/*! ractive */ 4);
	var AppStore = __webpack_require__(/*! ./lib/stores/app-stores */ 6);
	var AppAction = __webpack_require__(/*! ./lib/actions/app-actions */ 7);
	var ractive = new Ractive({
	    el: "js-main",
	    template: "<ul>\n    {{#each users:i}}\n        <li>\n            <user index=\"{{i}}\"/>\n        </li>\n    {{/each}}\n</ul>\n<button on-click=\"addUser\">Add User</button>\n",
	    data: {
	        users: AppStore.getUsers()
	    },
	    components: {
	        user: __webpack_require__(/*! ./lib/components/app-view */ 8)
	    }
	});
	ractive.on("addUser", function () {
	    AppAction.addUser({
	        name: "tester",
	        notify: false
	    })
	});
	function onChange(users) {
	    ractive.set("users", users);
	}
	AppStore.addChangeListener(function () {
	    onChange(AppStore.getUsers());
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!**********************************!*\
  !*** ./lib/stores/app-stores.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	
	var AppConstants = __webpack_require__(/*! ../constants/app-constants */ 10);
	var AppDispatcher = __webpack_require__(/*! ../dispatchers/app-dispatchers */ 11);
	var EventEmitter = __webpack_require__(/*! events */ 1).EventEmitter;
	var objectAssign = __webpack_require__(/*! object-assign */ 2);
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
	function addUser(user) {
	    user.id = _users.length;
	    _users.push(user);
	}
	
	var AppStore = objectAssign(EventEmitter.prototype, {
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
	        case AppConstants.ADD_USER:
	            addUser(payload.action.user);
	            break;
	    }
	    AppStore.emitChange();
	    return true;
	});
	module.exports = AppStore;

/***/ },
/* 7 */
/*!************************************!*\
  !*** ./lib/actions/app-actions.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	var AppConstants = __webpack_require__(/*! ../constants/app-constants */ 10);
	var AppDispatcher = __webpack_require__(/*! ../dispatchers/app-dispatchers */ 11);
	
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

/***/ },
/* 8 */
/*!************************************!*\
  !*** ./lib/components/app-view.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	var AppAction = __webpack_require__(/*! ../actions/app-actions */ 7);
	var templateString = "<input type=\"checkbox\" on-click=\"clicked\" {{#if notify}}checked{{/if}}/> Notify {{name}} {{#if notify}}✔{{/if}}";
	var Ractive = __webpack_require__(/*! ractive */ 4);
	var UserComponent = Ractive.extend({
	    template: templateString,
	    init: function () {
	        this.on('clicked', function (ev) {
	            AppAction.updateUser(this.get("index"));
	        });
	    }
	});
	module.exports = UserComponent;

/***/ },
/* 9 */,
/* 10 */
/*!****************************************!*\
  !*** ./lib/constants/app-constants.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	module.exports = {
	    ADD_USER: "ADD_USER",
	    UPDATE_USER: "UPDATE_USER"
	};

/***/ },
/* 11 */
/*!********************************************!*\
  !*** ./lib/dispatchers/app-dispatchers.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Dispatcher = __webpack_require__(/*! flux */ 3).Dispatcher;
	var objectAssign = __webpack_require__(/*! object-assign */ 2);
	
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

/***/ }
]);
//# sourceMappingURL=bundle.js.map