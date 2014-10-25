webpackJsonp([0],{

/***/ 0:
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	var Vue = __webpack_require__(/*! vue */ 4);
	var AppStore = __webpack_require__(/*! ../lib/stores/app-stores */ 13);
	var AppAction = __webpack_require__(/*! ../lib/actions/app-actions */ 14);
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

/***/ },

/***/ 13:
/*!***********************************!*\
  !*** ../lib/stores/app-stores.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	
	var AppConstants = __webpack_require__(/*! ../constants/app-constants */ 37);
	var AppDispatcher = __webpack_require__(/*! ../dispatchers/app-dispatchers */ 38);
	var EventEmitter = __webpack_require__(/*! events */ 1).EventEmitter;
	var merge = __webpack_require__(/*! react/lib/merge */ 36);
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
	        case AppConstants.ADD_USER:
	            addUser(payload.action.user);
	            break;
	    }
	    AppStore.emitChange();
	    return true;
	});
	module.exports = AppStore;

/***/ },

/***/ 14:
/*!*************************************!*\
  !*** ../lib/actions/app-actions.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	var AppConstants = __webpack_require__(/*! ../constants/app-constants */ 37);
	var AppDispatcher = __webpack_require__(/*! ../dispatchers/app-dispatchers */ 38);
	
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

/***/ 37:
/*!*****************************************!*\
  !*** ../lib/constants/app-constants.js ***!
  \*****************************************/
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

/***/ 38:
/*!*********************************************!*\
  !*** ../lib/dispatchers/app-dispatchers.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Dispatcher = __webpack_require__(/*! flux */ 2).Dispatcher;
	var copyProperties = __webpack_require__(/*! react/lib/copyProperties */ 121);
	var AppDispatcher = copyProperties(new Dispatcher(), {
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

});
//# sourceMappingURL=bundle.js.map