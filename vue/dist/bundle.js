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
	var AppStore = __webpack_require__(/*! ../lib/stores/app-stores */ 178);
	var AppAction = __webpack_require__(/*! ../lib/actions/app-actions */ 181);
	var vue = new Vue({
	    el: '#js-main',
	    data: {
	        users: AppStore.getUsers(),
	        clicked: function (index) {
	            AppAction.updateUser(index);
	        }
	    }
	});
	
	function onChange(users){
	    vue.$set(users, users);
	}
	AppStore.addChangeListener(function () {
	    onChange(AppStore.getUsers());
	});

/***/ },

/***/ 178:
/*!***********************************!*\
  !*** ../lib/stores/app-stores.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	
	var AppConstants = __webpack_require__(/*! ../constants/app-constants */ 179);
	var AppDispatcher = __webpack_require__(/*! ../dispatchers/app-dispatchers */ 180);
	var EventEmitter = __webpack_require__(/*! events */ 1).EventEmitter;
	var merge = __webpack_require__(/*! react/lib/merge */ 67);
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

/***/ },

/***/ 179:
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
	    UPDATE_USER: "UPDATE_USER"
	};

/***/ },

/***/ 180:
/*!*********************************************!*\
  !*** ../lib/dispatchers/app-dispatchers.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Dispatcher = __webpack_require__(/*! flux */ 2).Dispatcher;
	var copyProperties = __webpack_require__(/*! react/lib/copyProperties */ 159);
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

/***/ },

/***/ 181:
/*!*************************************!*\
  !*** ../lib/actions/app-actions.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by azu on 2014/10/25.
	 * LICENSE : MIT
	 */
	"use strict";
	var AppConstants = __webpack_require__(/*! ../constants/app-constants */ 179);
	var AppDispatcher = __webpack_require__(/*! ../dispatchers/app-dispatchers */ 180);
	
	var AppActions = {
	    updateUser: function (index) {
	        AppDispatcher.handleViewAction({
	            actionType: AppConstants.UPDATE_USER,
	            index: index
	        });
	    }
	};
	
	module.exports = AppActions;

/***/ }

});
//# sourceMappingURL=bundle.js.map