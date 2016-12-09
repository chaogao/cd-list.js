(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("CdList", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["CdList"] = factory(require("jQuery"));
	else
		root["CdList"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "lib";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _event = __webpack_require__(1);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _history_h = __webpack_require__(2);
	
	var _history_h2 = _interopRequireDefault(_history_h);
	
	var _mixin2 = __webpack_require__(4);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var $ = __webpack_require__(5);
	var search = __webpack_require__(6);
	
	var CdList = function (_mixin) {
	  _inherits(CdList, _mixin);
	
	  function CdList(option, el) {
	    _classCallCheck(this, CdList);
	
	    var _this = _possibleConstructorReturn(this, (CdList.__proto__ || Object.getPrototypeOf(CdList)).call(this));
	
	    _this.option = option;
	    _this.$el = $(el).addClass('cdlist-root-container');
	    _this._initEvent();
	    _this._bindHistory();
	
	    _this.trigger('created');
	    return _this;
	  }
	
	  return CdList;
	}((0, _mixin3.default)());
	
	CdList.addons = {
	  search: search
	};
	
	exports.default = CdList;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var handlers = {},
	    _zid = 1;
	
	// 事件对象
	function returnFalse() {
	  return false;
	};
	
	function returnTrue() {
	  return true;
	};
	
	function Event(name, data) {
	  this.type = this.name = name;
	  data && $.extend(this, data);
	};
	
	Event.prototype = {
	  isDefaultPrevented: returnFalse,
	  isPropagationStopped: returnFalse,
	  preventDefault: function preventDefault() {
	    this.isDefaultPrevented = returnTrue;
	  },
	  stopPropagation: function stopPropagation() {
	    this.isPropagationStopped = returnTrue;
	  }
	};
	
	/**
	 * 为上下文生成唯一 zid, 用于事件检索
	 * @private
	 */
	function zid(context) {
	  return context._zid || (context._zid = _zid++);
	}
	
	/**
	 * 查询 handler
	 * @private
	 */
	function findHandlers(context, name, fn) {
	  return (handlers[zid(context)] || []).filter(function (handler) {
	    return handler && (!name || name == handler.name) && (!fn || fn == handler.fn);
	  });
	}
	
	exports.Event = Event;
	
	var EventMixin = function () {
	  function EventMixin() {
	    _classCallCheck(this, EventMixin);
	  }
	
	  _createClass(EventMixin, [{
	    key: "on",
	    value: function on(name, fn, context) {
	      var id = zid(this),
	          set = handlers[id] || (handlers[id] = []);
	
	      context = context || this; // 绑定上下文
	
	      set.push({
	        fn: fn,
	        name: name,
	        i: set.length,
	        context: context
	      });
	
	      return this;
	    }
	
	    /**
	     * 移除事件
	     */
	
	  }, {
	    key: "off",
	    value: function off(name, fn, context) {
	      var id = zid(this);
	
	      findHandlers(this, name, fn).forEach(function (handler) {
	        delete handlers[id][handler.i];
	      });
	    }
	
	    /**
	     * 触发事件
	     */
	
	  }, {
	    key: "trigger",
	    value: function trigger(name, data) {
	      var id = zid(this),
	          e;
	
	      e = (typeof name === "undefined" ? "undefined" : _typeof(name)) == "object" ? name : new Event(name);
	
	      name = name && name.type || name;
	
	      findHandlers(this, name).forEach(function (handler) {
	
	        if (handler.fn.apply(handler.context, [e].concat(data)) === false || e.isPropagationStopped && e.isPropagationStopped()) {
	          return false;
	        };
	      });
	
	      return e;
	    }
	  }]);
	
	  return EventMixin;
	}();
	
	exports.default = EventMixin;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _history = __webpack_require__(3);
	
	var _history2 = _interopRequireDefault(_history);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * remove base path
	 */
	function getLocation(base) {
	  var path = window.location.pathname;
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length);
	  }
	  return (path || '/') + window.location.search + window.location.hash;
	}
	
	/**
	 * pushState
	 */
	function pushState(url) {
	  var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  var history = window.history;
	  try {
	    if (replace) {
	      history.replaceState('', '', url);
	    } else {
	      history.pushState('', '', url);
	    }
	  } catch (e) {
	    window.location[replace ? 'assign' : 'replace'](url);
	  }
	}
	
	/**
	 * cover // to /
	 */
	function cleanPath(path) {
	  return path.replace(/\/\//g, '/');
	}
	
	var HTML5History = function (_History) {
	  _inherits(HTML5History, _History);
	
	  function HTML5History(base, cb) {
	    _classCallCheck(this, HTML5History);
	
	    var _this = _possibleConstructorReturn(this, (HTML5History.__proto__ || Object.getPrototypeOf(HTML5History)).call(this, base, cb));
	
	    _this._listenPop();
	    return _this;
	  }
	
	  _createClass(HTML5History, [{
	    key: '_listenPop',
	    value: function _listenPop() {
	      var _this2 = this;
	
	      window.addEventListener('popstate', function (e) {
	        _this2.cb();
	      });
	    }
	  }, {
	    key: 'go',
	    value: function go(n) {
	      window.history.go(n);
	    }
	  }, {
	    key: 'getState',
	    value: function getState() {
	      var state = {
	        hash: getLocation(this.base)
	      };
	
	      return state;
	    }
	  }, {
	    key: 'push',
	    value: function push(url) {
	      pushState(cleanPath(this.base + url));
	    }
	  }, {
	    key: 'replace',
	    value: function replace(url) {
	      pushState(cleanPath(this.base + url), true);
	    }
	  }]);
	
	  return HTML5History;
	}(_history2.default);
	
	exports.default = HTML5History;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * cd-list History api
	 */
	function normalizeBase(base) {
	  if (!base) {
	    var baseEl = document.querySelector('base');
	    base = baseEl ? baseEl.getAttribute('href') : '/';
	  }
	
	  if (base.charAt(0) !== '/') {
	    base = '/' + base;
	  }
	
	  return base.replace(/\/$/, '');
	}
	
	var History = function () {
	  _createClass(History, [{
	    key: 'go',
	    value: function go() {
	      throw 'need implemented';
	    }
	  }, {
	    key: 'push',
	    value: function push() {
	      throw 'need implemented';
	    }
	  }, {
	    key: 'replace',
	    value: function replace() {
	      throw 'need implemented';
	    }
	  }]);
	
	  function History() {
	    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
	    var cb = arguments[1];
	
	    _classCallCheck(this, History);
	
	    this.base = normalizeBase(base);
	    this.listend(cb);
	  }
	
	  _createClass(History, [{
	    key: 'listen',
	    value: function listen() {
	      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
	
	      this.cb = cb;
	    }
	  }]);
	
	  return History;
	}();
	
	exports.default = History;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mix;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function mix() {
	  var Mix = function Mix() {
	    _classCallCheck(this, Mix);
	  };
	
	  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
	    mixins[_key] = arguments[_key];
	  }
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	
	    for (var _iterator = mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var mixin = _step.value;
	
	      copyProperties(Mix, mixin);
	      copyProperties(Mix.prototype, mixin.prototype);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return Mix;
	}
	
	function copyProperties(target, source) {
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = Reflect.ownKeys(source)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var key = _step2.value;
	
	      if (key !== "constructor" && key !== "prototype" && key !== "name") {
	        var desc = Object.getOwnPropertyDescriptor(source, key);
	        Object.defineProperty(target, key, desc);
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var $ = __webpack_require__(5);
	
	$('body');
	
	exports.default = {};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cdlist.js.map