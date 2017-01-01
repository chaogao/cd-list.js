(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("CdList", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["CdList"] = factory(require("jQuery"));
	else
		root["CdList"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_55__) {
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(17);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(25);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(48);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _jquery = __webpack_require__(55);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _filter = __webpack_require__(56);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _pagination = __webpack_require__(58);
	
	var _pagination2 = _interopRequireDefault(_pagination);
	
	var _search = __webpack_require__(80);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _sort = __webpack_require__(81);
	
	var _sort2 = _interopRequireDefault(_sort);
	
	var _event = __webpack_require__(60);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _history_h = __webpack_require__(82);
	
	var _history_h2 = _interopRequireDefault(_history_h);
	
	var _mixin2 = __webpack_require__(61);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _url = __webpack_require__(84);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var tools = void 0;
	var addons = void 0;
	var TPL_CD_LAYOUT = ['<div data-cd-container="plugin-top"></div>', '<div class="cdlist-list-container" data-cd-container="list"></div>', '<div data-cd-container="plugin-bottom"></div>'];
	var TPL_CD_EMPTY = '<div class="cdlist-list-empty">没有数据，重新查询</div>';
	
	var STAT_LOADING = 'STATE_LOADING';
	var STAT_LOADED = 'STAT_LOADED';
	
	var DEFAULT_HISTORY_CONF = {
	  base: window.location.pathname
	};
	
	var _option = {
	  disableHistory: false
	};
	
	var CdList = function (_mixin) {
	  (0, _inherits3["default"])(CdList, _mixin);
	
	  function CdList(option, el) {
	    (0, _classCallCheck3["default"])(this, CdList);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, (CdList.__proto__ || (0, _getPrototypeOf2["default"])(CdList)).call(this));
	
	    _this.option = (0, _assign2["default"])({}, _option, option);
	    _this.$el = (0, _jquery2["default"])(el).addClass('cdlist-root-container');
	
	    _this._bindHistory();
	    _this._initEvent();
	
	    _this.setAddons(option.addons);
	    return _this;
	  }
	
	  (0, _createClass3["default"])(CdList, [{
	    key: 'getHistoryValue',
	    value: function getHistoryValue(key) {
	      if (this.historyOpt) {
	        return this.historyOpt[key];
	      }
	    }
	  }, {
	    key: 'removeHistory',
	    value: function removeHistory(key, preventDisptach) {
	      var _this2 = this;
	
	      if (!this.historyOpt) {
	        return;
	      }
	
	      // 防止立即执行
	      this._pushAction(function () {
	        delete this.historyOpt[key];
	      });
	
	      this._pushTimer && clearTimeout(this._pushTimer);
	      this._pushTimer = setTimeout(function () {
	        _this2._pushHistory(preventDisptach);
	      }, 5);
	    }
	
	    /**
	     *
	     */
	
	  }, {
	    key: 'setHistory',
	    value: function setHistory(key, value, preventDisptach) {
	      var _this3 = this;
	
	      this.historyOpt = this.historyOpt || {};
	
	      // 和以前的一样不需要改变
	      if (this.historyOpt[key] == value) {
	        return;
	      }
	
	      this._pushAction(function () {
	        this.historyOpt[key] = value;
	      });
	
	      // addons will call many times
	      // but only push history onec
	      this._pushTimer && clearTimeout(this._pushTimer);
	      this._pushTimer = setTimeout(function () {
	        _this3._pushHistory(preventDisptach);
	      }, 5);
	    }
	  }, {
	    key: '_doAction',
	    value: function _doAction() {
	      var _this4 = this;
	
	      this._actions.forEach(function (a) {
	        a.apply(_this4);
	      });
	
	      this._actions = [];
	    }
	  }, {
	    key: '_pushHistory',
	    value: function _pushHistory(preventDisptach) {
	      var self = this;
	
	      self._doAction();
	
	      var historyOpt = self.historyOpt;
	      var param = _jquery2["default"].param(historyOpt);
	
	      self.preventDisptach = preventDisptach;
	      self.history.push('?' + param);
	    }
	  }, {
	    key: '_pushAction',
	    value: function _pushAction(cb) {
	      var self = this;
	
	      self._actions = self._actions || [];
	      self._actions.push(cb);
	    }
	
	    /**
	     * bind history Event
	     * every cdlist will listen history and disptach change events
	     * but addon can decide whether to response this event self
	     */
	
	  }, {
	    key: '_bindHistory',
	    value: function _bindHistory() {
	      var _this5 = this;
	
	      var self = this,
	          state,
	          historyOpt;
	
	      var option = (0, _assign2["default"])({}, DEFAULT_HISTORY_CONF, self.option.historyOption);
	
	      this.history = new _history_h2["default"](option.base, {
	        disableHistory: this.option.disableHistory
	      });
	
	      // get init history state
	      var state = this.history.getState();
	      var hash = decodeURIComponent(state.hash);
	      hash && (this.historyOpt = tools.url.getParamMap(hash));
	
	      this.history.listen(function (state) {
	        var historyOpt = _this5.historyOpt = tools.url.getParamMap(decodeURIComponent(state.hash));
	
	        if (!self.preventDisptach) {
	          self._disptachHistory(historyOpt);
	        }
	
	        self.preventDisptach = undefined;
	      });
	    }
	  }, {
	    key: '_disptachHistory',
	    value: function _disptachHistory(historyOpt) {
	      this.trigger('hashchange', [historyOpt]);
	    }
	  }, {
	    key: '_initEvent',
	    value: function _initEvent() {
	      var _this6 = this;
	
	      this.on('reflow', function () {
	        _this6.getList();
	      });
	    }
	
	    /**
	     * init cd list baseview & eveny addons
	     */
	
	  }, {
	    key: '_initView',
	    value: function _initView() {
	      this.$el.html(TPL_CD_LAYOUT);
	      this.$topPluginContainer = this.$el.find('[data-cd-container=plugin-top]');
	      this.$bottomPluginContainer = this.$el.find('[data-cd-container=plugin-bottom]');
	      this.$listContainer = this.$el.find('[data-cd-container=list]');
	
	      for (var key in this.addons) {
	        this.addons[key].initView();
	      }
	    }
	  }, {
	    key: 'getList',
	    value: function getList() {
	      var self = this;
	
	      // if ajax is getting data , abort it
	      if (self._isLoading()) {
	        self.ajaxInstance.abort();
	      }
	
	      var urlData = {};
	
	      for (var key in this.addons) {
	        urlData[key] = this.addons[key].getAddonData();
	      }
	
	      var url = self.option.getUrl(urlData);
	
	      // 通过 option AJAX 可以发送跨域请求
	      if (url) {
	        self.ajaxInstance = self.option.getAjaxData ? self.option.getAjaxData(url) : self._getAjaxData(url);
	
	        self._startLoading();
	
	        // 成功回调处理
	        self.ajaxInstance.done(function (json) {
	          var rowData = self.option.getRowsData(json);
	
	          self.trigger('loadeddata', [json]);
	
	          self._endLoading(json);
	          self._firstGet = false;
	
	          if (rowData && rowData.length) {
	            self._render(rowData, json);
	          } else {
	            self._renderEmpty();
	          }
	        });
	      }
	    }
	  }, {
	    key: 'setAddons',
	    value: function setAddons() {
	      var addonsList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	
	      var self = this;
	
	      self.addons = {};
	
	      // 初始化各个 addons
	      addonsList.forEach(function (addon) {
	        if (self._validateAddon(addon)) {
	          addon.setRoot(self);
	          self.addons[addon.getName()] = addon;
	        } else {
	          // console && console.warn('your addon ' + addon.getName() + ' is invaild');
	        }
	      });
	
	      self._initView();
	
	      return self;
	    }
	  }, {
	    key: '_validateAddon',
	    value: function _validateAddon(addon) {
	      var f = true;
	
	      ['getName', 'initView', 'setRoot'].forEach(function (item) {
	        if (addon[item] === undefined) {
	          f = false;
	          return false;
	        }
	      });
	
	      return f;
	    }
	  }, {
	    key: '_renderEmpty',
	    value: function _renderEmpty() {
	      this.$listContainer.html(this.option.empty ? this.option.empty() : TPL_CD_EMPTY);
	    }
	  }, {
	    key: '_getAjaxData',
	    value: function _getAjaxData(url) {
	      return _jquery2["default"].ajax({
	        url: url
	      });
	    }
	  }, {
	    key: '_isLoading',
	    value: function _isLoading() {
	      return this.__load_state == STAT_LOADING;
	    }
	  }, {
	    key: '_startLoading',
	    value: function _startLoading() {
	      this.__load_state = STAT_LOADING;
	      this.$el.addClass('loading');
	      this.trigger('startloading');
	    }
	  }, {
	    key: '_endLoading',
	    value: function _endLoading(json) {
	      this.__load_state = STAT_LOADED;
	      this.$el.removeClass('loading');
	      this.trigger('endloading', [json]);
	    }
	  }, {
	    key: '_render',
	    value: function _render(rowData, json) {
	      var self = this,
	          html;
	
	      var tbodyStr = '';
	
	      rowData.forEach(function (data) {
	        var str = self.option.rows(data);
	
	        tbodyStr += str;
	      });
	
	      if (self.option.isTable) {
	        html = ['<table class=\"' + (self.option.tableClass || '') + '\">', '<thead>', self.option.headerRow(rowData, json), '</thead>', '<tbody>', tbodyStr, '</tbody>', '</table>'].join("");
	      } else {
	        html = ['<ul class=\"' + (self.option.ulClass || '') + '\">', tbodyStr, '</ul>'].join("");
	      }
	
	      self.$listContainer.html(html);
	    }
	  }]);
	  return CdList;
	}((0, _mixin3["default"])(_event2["default"]));
	
	CdList.addons = addons = {
	  Filter: _filter2["default"],
	  Pagination: _pagination2["default"],
	  Search: _search2["default"],
	  Sort: _sort2["default"]
	};
	
	CdList.tools = tools = {
	  url: _url2["default"]
	};
	
	exports["default"] = CdList;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(10)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(11)
	  , toObject = __webpack_require__(12)
	  , IObject  = __webpack_require__(14);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(16)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(15);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(18), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(12);
	
	__webpack_require__(20)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(23);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(26);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Symbol = __webpack_require__(27)["default"];
	
	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(29);
	__webpack_require__(47);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(11)
	  , global         = __webpack_require__(6)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(31)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(32)
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(35)
	  , setToStringTag = __webpack_require__(36)
	  , uid            = __webpack_require__(38)
	  , wks            = __webpack_require__(37)
	  , keyOf          = __webpack_require__(39)
	  , $names         = __webpack_require__(41)
	  , enumKeys       = __webpack_require__(42)
	  , isArray        = __webpack_require__(43)
	  , anObject       = __webpack_require__(44)
	  , toIObject      = __webpack_require__(40)
	  , createDesc     = __webpack_require__(34)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(46)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(11)
	  , createDesc = __webpack_require__(34);
	module.exports = __webpack_require__(31) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).setDesc
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(37)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(35)('wks')
	  , uid    = __webpack_require__(38)
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(11)
	  , toIObject = __webpack_require__(40);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(14)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(40)
	  , getNames  = __webpack_require__(11).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(11);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(15);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(45);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 47 */
/***/ function(module, exports) {



/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$create = __webpack_require__(49)["default"];
	
	var _Object$setPrototypeOf = __webpack_require__(51)["default"];
	
	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }
	
	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};
	
	exports.__esModule = true;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(54).set});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(11).getDesc
	  , isObject = __webpack_require__(45)
	  , anObject = __webpack_require__(44);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(8)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_55__;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _jquery = __webpack_require__(55);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var template = __webpack_require__(57);
	
	var TPL_FILTER = '<div class="cdlist-filter-container">' + '<ul>' + '<% for (var i = 0; i < filters.length; i++) { %>' + '<li>' + '<span class="cdlist-filter-select-name"><%= filters[i].label %></span>' + '<select name=\'<%= filters[i].name %>\'>' + '<% for (var j = 0; j < filters[i].datas.length; j++) { %>' + '<option <% if (j == filters[i].activeIndex) { %>selected="selected"<% } %>  data-idx="<%= j %>" value=\'<%= filters[i].datas[j].value %>\'><%= filters[i].datas[j].name %></option>' + '<% } %>' + '</select>' + '</li>' + '<% } %>' + '</ul>' + '</div>';
	
	var TPL_FILTER_LINE = '<div class="cdlist-filter-container cdlist-filter-container-line">' + '<ul>' + '<% for (var i = 0; i < filters.length; i++) { %>' + '<li <% if (filters[i].className) { %>class="<%= filters[i].className %>" <% } %> >' + '<% if (filters[i].label) { %>' + '<div class="cdlist-filter-select-name"><%= filters[i].label %></div>' + '<% } %>' + '<ul class="cdlist-filter-raw-list">' + '<% for (var j = 0; j < filters[i].datas.length; j++) { %>' + '<li data-name="<%= filters[i].name %>" class="cdlist-filter-raw-item <% if (j == filters[i].activeIndex) { %>cdlist-filter-raw-item-active<% } %>" data-value="<%= filters[i].datas[j].value %>">' + '<a href="javascript:void(0)"><%= filters[i].datas[j].name %></a>' + '</li>' + '<% } %>' + '</ul>' + '</li>' + '<% } %>' + '</ul>' + '</div>';
	
	var _addonName = 'filter';
	var _option = {
	  resetList: ['pagination']
	};
	
	var Filter = function () {
	  function Filter(option) {
	    (0, _classCallCheck3["default"])(this, Filter);
	
	    this.option = (0, _assign2["default"])({}, _option, option);
	  }
	
	  (0, _createClass3["default"])(Filter, [{
	    key: 'getName',
	    value: function getName() {
	      return _addonName;
	    }
	
	    /**
	     * 获取存放 filter 的 container
	     */
	
	  }, {
	    key: '_getContainer',
	    value: function _getContainer() {
	      return this.option.container ? (0, _jquery2["default"])(this.option.container) : this.root.$topPluginContainer;
	    }
	  }, {
	    key: 'initView',
	    value: function initView() {
	      var self = this;
	      var $container = self._getContainer();
	
	      $container.append((0, _jquery2["default"])(self._getHTML()));
	
	      this._initEvent();
	    }
	
	    /**
	     * 改变 filter 时设置 hash
	     */
	
	  }, {
	    key: '_setHash',
	    value: function _setHash(key, value) {
	      var self = this;
	
	      // 找到 filter
	      var filter = self.option.filters.filter(function (item) {
	        return key == item.name;
	      })[0];
	
	      if (filter) {
	        self.root.setHistory(filter.historyKey || filter.name, value);
	      }
	    }
	  }, {
	    key: '_triggerResetEvent',
	    value: function _triggerResetEvent(preventSet) {
	      var _this = this;
	
	      this.option.resetList.forEach(function (addonName) {
	        _this.root.trigger(addonName + '.reset', [preventSet]);
	      });
	    }
	  }, {
	    key: '_initEvent',
	    value: function _initEvent() {
	      var self = this;
	
	      // 监听使自己 reset 的事件
	      self.root.on('filter.reset', function (e, preventDisptach) {
	        self.reset(preventDisptach);
	      });
	
	      // 发生改变立即进行重新请求
	      if (self.option.line) {
	        self._getContainer().delegate('.cdlist-filter-raw-item', 'click', function (e, preventSet) {
	          (0, _jquery2["default"])(this).addClass('cdlist-filter-raw-item-active').siblings().removeClass('cdlist-filter-raw-item-active');
	
	          self._triggerResetEvent(preventSet);
	          self.root.trigger('reflow');
	
	          // 设置 filter 的 hash
	          if (self.option.historyEnable && !preventSet) {
	            var key = (0, _jquery2["default"])(this).attr('data-name');
	            var value = (0, _jquery2["default"])(this).attr('data-value');
	
	            self._setHash(key, value, true);
	          }
	        });
	      } else {
	        self._getContainer().delegate('select', 'change', function (e, preventSet) {
	          self._triggerResetEvent(preventSet);
	          self.root.trigger('reflow');
	
	          // 设置 filter 的 hash
	          if (self.option.historyEnable && !preventSet) {
	            var key = (0, _jquery2["default"])(this).prop('name');
	            var value = (0, _jquery2["default"])(this).val();
	
	            self._setHash(key, value, true);
	          }
	        });
	      }
	    }
	
	    /**
	     * 处理默认的 filter 数据
	     * 找到每个 filter 的初始化选中的内容
	     */
	
	  }, {
	    key: '_dealFilterData',
	    value: function _dealFilterData(filters) {
	      var self = this,
	          option = self.option;
	
	      filters.forEach(function (item) {
	        // 最先控制本身的 activeIndex
	        if (item.activeIndex !== undefined) {
	          return;
	        }
	
	        // 开启 history 模式
	        // 需要找到 hash 对应的选项
	        if (self.option.historyEnable) {
	          var historyKey = item.historyKey || item.name;
	          var historyValue = self.root.getHistoryValue(historyKey);
	
	          if (historyValue) {
	            item.datas.forEach(function (data, idx) {
	              if (historyValue == data.value) {
	                item.activeIndex = idx;
	              }
	            });
	          }
	        }
	
	        // 总有 index
	        item.activeIndex = item.activeIndex || 0;
	      });
	    }
	
	    /**
	     * 渲染 filter 模板
	     */
	
	  }, {
	    key: '_getHTML',
	    value: function _getHTML() {
	      var filters = this.option.filters;
	      var self = this;
	
	      self._dealFilterData(filters);
	
	      if (self.option.line) {
	        return template(TPL_FILTER_LINE, { filters: filters });
	      } else {
	        return template(TPL_FILTER, { filters: filters });
	      }
	    }
	
	    /**
	     * 设置 filter 一项的选中状态
	     */
	
	  }, {
	    key: 'setActive',
	    value: function setActive(name, value, preventHistory) {
	      var filter = this._getFilterByName(name);
	      var self = this;
	
	      if (!filter) {
	        return;
	      }
	
	      if (self.option.line) {
	        var $li = self._getContainer().find('.cdlist-filter-raw-item[data-name="' + filter.name + '"][data-value="' + value + '"]');
	
	        // 已经选中了就不触发了
	        if ($li.hasClass('cdlist-filter-raw-item-active')) {
	          return;
	        }
	
	        if ($li.length) {
	          $li.trigger('click', [preventHistory]);
	        }
	      } else {
	        var $option = self._getContainer().find('select[name="' + filter.name + '"] option[value="' + value + '"]');
	
	        if ($option.prop('selected')) {
	          return;
	        }
	
	        if ($option.length) {
	          self._getContainer().find('select[name="' + filter.name + '"]').prop('selectedIndex', $option.data('idx')).trigger('change', [preventHistory]);
	        }
	      }
	    }
	
	    /**
	     * 通过 name 获取 filter 项目
	     */
	
	  }, {
	    key: '_getFilterByName',
	    value: function _getFilterByName(name) {
	      var filter = this.option.filters.filter(function (item) {
	        return name == item.name;
	      });
	
	      return filter[0];
	    }
	
	    /**
	     * 设置 addon 的 root 对象
	     */
	
	  }, {
	    key: 'setRoot',
	    value: function setRoot(root) {
	      var self = this;
	
	      self.root = root;
	
	      // 如果可以改变 hash
	      if (self.option.historyEnable) {
	        self.root.on('hashchange', function (e, hashData) {
	          var currentData = self.getAddonData(true);
	
	          for (var key in currentData) {
	            // 找到 filter
	            var filter = self._getFilterByName(key);
	
	            // 没有 filter 就继续
	            if (!filter) {
	              continue;
	            }
	
	            // 找到 history key
	            var historyKey = filter.historyKey || filter.name;
	
	            // 判定是否相等
	            // 如果不相等需要改变 当前显示，并派发请求
	            // 如果没有 hashValue 则为 filter 默认选中状态的 value
	            var hashValue = hashData[historyKey] || filter.datas[filter.activeIndex].value;
	
	            if (hashValue != currentData[key]) {
	              if (self.option.line) {
	                var value = hashData[historyKey] || filter.datas[filter.activeIndex].value;
	
	                var $li = self._getContainer().find('.cdlist-filter-raw-item[data-name="' + key + '"][data-value="' + value + '"]');
	
	                if ($li.length) {
	                  $li.trigger('click', [true]);
	                }
	              } else {
	                var value = hashData[historyKey] || filter.datas[filter.activeIndex].value;
	
	                var $option = self._getContainer().find('select[name="' + key + '"] option[value="' + value + '"]');
	
	                if ($option.length) {
	                  self._getContainer().find('select[name="' + key + '"]').prop('selectedIndex', $option.data('idx')).trigger('change', [true]);
	                }
	              }
	            }
	          }
	        });
	      }
	    }
	
	    /**
	     * 重置 filter 所有的 select
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset(preventDisptach) {
	      var _this2 = this;
	
	      this.option.filters.forEach(function (filter) {
	        _this2.setActive(filter.name, filter.datas[filter.resetIndex || 0].value, preventDisptach);
	      });
	    }
	
	    /**
	     * 获取 addon 提供的 url 数据
	     */
	
	  }, {
	    key: 'getAddonData',
	    value: function getAddonData() {
	      var data = {};
	      var self = this;
	      var filters = self.option.filters;
	
	      if (self.option.line) {
	        this._getContainer().find('.cdlist-filter-raw-item-active').each(function () {
	          data[(0, _jquery2["default"])(this).attr('data-name')] = (0, _jquery2["default"])(this).attr('data-value');
	        });
	      } else {
	        this._getContainer().find('select').each(function () {
	          data[(0, _jquery2["default"])(this).prop('name')] = (0, _jquery2["default"])(this).val();
	        });
	      }
	
	      return data;
	    }
	  }]);
	  return Filter;
	}();
	
	exports["default"] = Filter;
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = tmpl;
	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed
	function tmpl(str, data) {
	  // Figure out if we're getting a template, or if we need to
	  // load the template - and be sure to cache the result.
	  var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
	
	  // Generate a reusable function that will serve as a template
	  // generator (and which will be cached).
	  new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" +
	
	  // Introduce the data as local variables using with(){}
	  "with(obj){p.push('" +
	
	  // Convert the template into pure JavaScript
	  str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
	
	  // Provide some basic currying to the user
	  return data ? fn(data) : fn;
	}
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _jquery = __webpack_require__(55);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var template = __webpack_require__(57);
	var PaginationTool = __webpack_require__(59);
	
	var TPL_PA = '<div class="cdlist-pagination-container"></div>';
	
	var _addonName = 'pagination';
	
	var Pagination = function () {
	  function Pagination(option) {
	    (0, _classCallCheck3["default"])(this, Pagination);
	
	    // 设置默认的 historyKey
	    if (option.historyEnable) {
	      option.historyKey = option.historyKey || 'page';
	    }
	
	    this.option = option;
	  }
	
	  (0, _createClass3["default"])(Pagination, [{
	    key: 'getName',
	    value: function getName() {
	      return _addonName;
	    }
	
	    /**
	     * 获取存放 addons 的 container
	     */
	
	  }, {
	    key: '_getContainer',
	    value: function _getContainer() {
	      return this.option.container ? (0, _jquery2["default"])(this.option.container) : this.root.$bottomPluginContainer;
	    }
	
	    /**
	     * addons 的 view 渲染
	     */
	
	  }, {
	    key: 'initView',
	    value: function initView() {
	      var self = this;
	
	      self._getContainer().html(TPL_PA);
	      self._initEvent();
	
	      if (self.option.historyEnable && self.root.getHistoryValue(self.option.historyKey)) {
	        self._initPage = parseInt(self.root.getHistoryValue(self.option.historyKey));
	      }
	
	      // 在完成回调时执行真正的 initView
	      self.root.on('endloading', function (e, json) {
	        self._initView(json);
	      });
	    }
	
	    /**
	     * 真正初始化分页控件的位置
	     */
	
	  }, {
	    key: '_initView',
	    value: function _initView(json) {
	      var self = this,
	          setting = self.option.getSetting(json),
	          $container = self._getContainer();
	
	      if (!self._pageInstance && setting) {
	        self._pageInstance = new PaginationTool($container.find('.cdlist-pagination-container'), {
	          pageCount: setting.total,
	          currentPage: self.savedIndex || self._initPage || 0,
	          allwaysShow: true,
	          maxShowPage: 3,
	          preventInitEvent: true
	        });
	
	        // initPage 只用一次
	        self.savedIndex = undefined;
	        self._initPage = undefined;
	
	        self._pageInstance.on('page', function (e, currentPage) {
	          self.root.trigger('reflow');
	
	          // 设置 filter 的 hash
	          if (self.option.historyEnable && !self.preventSet) {
	            self.root.setHistory(self.option.historyKey, currentPage);
	          }
	
	          self.preventSet = undefined;
	        });
	      }
	    }
	
	    /**
	     * 注册事件
	     */
	
	  }, {
	    key: '_initEvent',
	    value: function _initEvent() {
	      var self = this;
	
	      self.root.on('pagination.reset', function (e, preventDisptach) {
	        self.reset();
	
	        // 删除 historyKey
	        if (self.option.historyKey && !preventDisptach) {
	          self.root.removeHistory(self.option.historyKey);
	        }
	      });
	    }
	
	    /**
	     * 重置 page 控件
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this._pageInstance && this._pageInstance.destroy();
	      this._pageInstance = null;
	    }
	
	    /**
	     * 设置 addon 的 root 对象
	     */
	
	  }, {
	    key: 'setRoot',
	    value: function setRoot(root) {
	      var self = this;
	
	      this.root = root;
	
	      // 如果可以改变 hash
	      if (self.option.historyEnable) {
	        self.root.on('hashchange', function (e, hashData) {
	          var currentData = self.getAddonData();
	          var historyValue = self.root.getHistoryValue(self.option.historyKey);
	
	          if (currentData != historyValue) {
	            // setPage 不能传递事件参数 通过 wrapper 模拟
	            self.preventSet = true;
	            self._pageInstance && self._pageInstance.setPage(historyValue || 0);
	            self.savedIndex = historyValue;
	            self.preventSet = undefined;
	          }
	        });
	      }
	    }
	
	    /**
	     * 获取 addon 提供的 url 数据
	     */
	
	  }, {
	    key: 'getAddonData',
	    value: function getAddonData() {
	      var page = this._pageInstance ? this._pageInstance.getPage() : this.savedIndex !== undefined && parseInt(this.savedIndex) || this._initPage || 0;
	
	      return page;
	    }
	  }]);
	  return Pagination;
	}();
	
	exports["default"] = Pagination;
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(17);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(25);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(48);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _template = __webpack_require__(57);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _event = __webpack_require__(60);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _mixin2 = __webpack_require__(61);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/**
	 * 从 jsmod ui 类库中引入分页插件
	 * MIT Licensed
	 */
	var _option = {
	  currentPage: 0,
	  maxShowPage: 10,
	  textLabel: ['首页', '上一页', '下一页', '尾页'],
	  pageLabel: '{#0}',
	  preventInitEvent: false
	};
	
	var PAGE_TPL = '' + '<div class="mod-page">' + '<% for (var i = 0; i < renderDatas.length; i++) { %>' + '<a href="javascript:void(0);" <% if (renderDatas[i].page !== undefined) { %> data-page="<%= renderDatas[i].page %>" <% } %> class="mod-page-item <%= renderDatas[i].className %>"><%= renderDatas[i].label %></a>' + '<% } %>' + '</div>';
	
	/**
	 * 分页控件，无需写 html ，提供一个 div 节点自动生成所有的分页所需标签
	 * @alias module:jsmod/ui/pagination
	 * @constructor
	 * @param {(dom|string)}      element                                                          分页控件的容器
	 * @param {object}            option                                                           分页控件配置参数
	 * @param {int}               option.pageCount                                                 一共有多少页
	 * @param {int}               [option.currentPage=0]                                           当前页
	 * @param {int}               [option.maxShowPage=10]                                          最多显示分页个数
	 * @param {array}             [option.textLabel=new Array('首页', '上一页', '下一页', '尾页')] 几个特殊关键字
	 * @param {(string|function)} [option.pageLabel={#0}]                                          字符串用 {#0} 代表当前页, 函数则取返回值作为显示。函数其参数 page 为索引计数（起始0）；而替换字符串为 page + 1
	 * @param {bool}              [option.preventInitEvent=false]                                  是否阻止初始化时触发事件
	 * @param {bool}              [option.allwaysShow=false]                                       是否总是显示
	 * @example
	 * var Pagination = require("jsmod/ui/pagination");
	 *
	 * // 创建实例
	 * new Pagination("#page-container", {pageCount: 20});
	 */
	var Pagination = function (_mixin) {
	  (0, _inherits3["default"])(Pagination, _mixin);
	
	  function Pagination(element, option) {
	    (0, _classCallCheck3["default"])(this, Pagination);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, (Pagination.__proto__ || (0, _getPrototypeOf2["default"])(Pagination)).call(this));
	
	    var self = _this;
	
	    self.element = $(element);
	    self.option = $.extend({}, _option, option);
	
	    self.generatePage();
	    return _this;
	  }
	  /**
	   * @private
	   * @description 生成分页控件、包括html、event
	   */
	
	
	  (0, _createClass3["default"])(Pagination, [{
	    key: 'generatePage',
	    value: function generatePage() {
	      var self = this,
	          option = self.option,
	          renderDatas,
	          html;
	
	      self.generateEvents();
	
	      if (option.pageCount < option.maxShowPage) {
	        option.maxShowPage = option.pageCount;
	      }
	
	      if (option.preventInitEvent) {
	        self.setPage(option.currentPage);
	      } else {
	        // 异步处理是因为需要获取page对象并绑定事件
	        setTimeout(function () {
	          self.setPage(option.currentPage);
	        }, 0);
	      }
	    }
	
	    /**
	     * 手动设置当前页
	     * @public
	     * @param {int} page 当前页
	     * @fires module:jsmod/ui/pagination#page
	     */
	
	  }, {
	    key: 'setPage',
	    value: function setPage(page, preventDisptach) {
	      var self = this,
	          html,
	          e;
	
	      html = self.getHTML(self.getRenderDatas(page));
	      self.element.html(html);
	
	      /**
	       * 设置page触发的事件，重复设置相同page会触发多次事件
	       * @event module:jsmod/ui/pagination#page
	       * @type {object}
	       * @property {int} page 当前设定的page值
	       */
	      if (!preventDisptach) {
	        self.trigger('page', [self.currentPage]);
	      }
	    }
	
	    /**
	     * 获取当前的 page
	     * @public
	     */
	
	  }, {
	    key: 'getPage',
	    value: function getPage() {
	      return this.currentPage;
	    }
	
	    /**
	     * @private
	     * @description 生成事件
	     */
	
	  }, {
	    key: 'generateEvents',
	    value: function generateEvents() {
	      var self = this,
	          element = self.element,
	          option = self.option;
	
	      element.undelegate("click.page");
	      element.delegate("[data-page]:not(.mod-page-item-disabled)", "click.page", function (e) {
	        var page = $(this).data("page");
	
	        if ($.isNumeric(page)) {
	          self.setPage(page);
	        } else if (page == "+") {
	          self.setPage(self.currentPage + 1);
	        } else if (page == "-") {
	          self.setPage(self.currentPage - 1);
	        }
	
	        return false;
	      });
	    }
	
	    /**
	     * 清空分页容器，移除事件
	     * @public
	     */
	
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.element.undelegate("click.page");
	      this.element.html("");
	    }
	
	    /**
	     * @private
	     * @description 获取HTML代码
	     * @param {array} renderDatas 渲染分页的数据
	     */
	
	  }, {
	    key: 'getHTML',
	    value: function getHTML(renderDatas) {
	      var html;
	
	      html = (0, _template2["default"])(PAGE_TPL, { renderDatas: renderDatas });
	      return html;
	    }
	
	    /**
	     * @private
	     * @description 获取分页渲染数据
	     * @param {int} page 标示当前页
	     * @return {array} renderDatas 渲染分页的数据
	     */
	
	  }, {
	    key: 'getRenderDatas',
	    value: function getRenderDatas(page) {
	      var self = this,
	          option = self.option,
	          renderDatas = [],
	          start,
	          end,
	          offsetEnd,
	          offsetStart;
	
	      page = parseInt(page);
	      page = page < 0 ? 0 : page;
	      page = page > option.pageCount - 1 ? option.pageCount - 1 : page;
	
	      var flag = parseInt(option.maxShowPage / 3); // 分页渲染当前页的标识位
	
	      start = page - flag < 0 ? 0 : page - flag; // start 位置
	      offsetEnd = page - flag < 0 ? Math.abs(page - flag) : 0; // end 的偏移
	
	      end = page + (option.maxShowPage - flag) - 1 > option.pageCount - 1 ? option.pageCount - 1 : page + (option.maxShowPage - flag) - 1; // end 位置
	      offsetStart = page + (option.maxShowPage - flag) - 1 > option.pageCount - 1 ? Math.abs(page + (option.maxShowPage - flag) - 1 - (option.pageCount - 1)) : 0; // start 的偏移
	
	      start -= offsetStart;
	      end += offsetEnd;
	
	      if (page != 0 || option.allwaysShow) {
	        // 处理固定的前两个数据
	        $.each(option.textLabel.slice(0, 2), function (i, label) {
	          if (i == 0 && label) {
	            renderDatas.push({
	              className: page == 0 ? 'mod-page-item-first mod-page-item-disabled' : "mod-page-item-first",
	              label: label,
	              page: 0
	            });
	          }
	          if (i == 1 && label) {
	            renderDatas.push({
	              className: page == 0 ? "mod-page-item-prev mod-page-item-disabled" : "mod-page-item-prev",
	              label: label,
	              page: "-"
	            });
	          }
	        });
	      }
	
	      // 处理页面信息
	      for (start; start <= end; start++) {
	        renderDatas.push({
	          className: start == page ? "mod-page-item-active" : "",
	          label: $.isFunction(option.pageLabel) ? option.pageLabel(start) : option.pageLabel.replace(/{#0}/g, start + 1),
	          page: start
	        });
	      }
	
	      if (page != option.pageCount - 1 || option.allwaysShow) {
	        // 处理固定的后两个数据
	        $.each(option.textLabel.slice(2, 4), function (i, label) {
	          if (i == 0 && label) {
	            renderDatas.push({
	              className: page == option.pageCount - 1 ? 'mod-page-item-next mod-page-item-disabled' : "mod-page-item-next",
	              label: label,
	              page: "+"
	            });
	          }
	          if (i == 1 && label) {
	            renderDatas.push({
	              className: page == option.pageCount - 1 ? 'mod-page-item-last mod-page-item-disabled' : "mod-page-item-last",
	              label: label,
	              page: option.pageCount - 1
	            });
	          }
	        });
	      }
	
	      // 设置当前页码
	      self.currentPage = page;
	
	      return renderDatas;
	    }
	  }]);
	  return Pagination;
	}((0, _mixin3["default"])(_event2["default"]));
	
	exports["default"] = Pagination;
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Event = undefined;
	
	var _typeof2 = __webpack_require__(26);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _assign = __webpack_require__(2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
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
	  data && (0, _assign2["default"])(this, data);
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
	exports["default"] = {
	  on: function on(name, fn, context) {
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
	  },
	
	
	  /**
	   * 移除事件
	   */
	  off: function off(name, fn, context) {
	    var id = zid(this);
	
	    findHandlers(this, name, fn).forEach(function (handler) {
	      delete handlers[id][handler.i];
	    });
	  },
	
	
	  /**
	   * 触发事件
	   */
	  trigger: function trigger(name, data) {
	    var id = zid(this),
	        e;
	
	    e = (typeof name === "undefined" ? "undefined" : (0, _typeof3["default"])(name)) == "object" ? name : new Event(name);
	
	    name = name && name.type || name;
	
	    findHandlers(this, name).forEach(function (handler) {
	
	      if (handler.fn.apply(handler.context, [e].concat(data)) === false || e.isPropagationStopped && e.isPropagationStopped()) {
	        return false;
	      };
	    });
	
	    return e;
	  }
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty = __webpack_require__(23);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	var _getOwnPropertyDescriptor = __webpack_require__(62);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	var _getIterator2 = __webpack_require__(65);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	exports["default"] = mix;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function mix() {
	  var Mix = function Mix() {
	    (0, _classCallCheck3["default"])(this, Mix);
	  };
	
	  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
	    mixins[_key] = arguments[_key];
	  }
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	
	    for (var _iterator = (0, _getIterator3["default"])(mixins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var mixin = _step.value;
	
	      copyProperties(Mix.prototype, mixin);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator["return"]) {
	        _iterator["return"]();
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
	  for (var key in source) {
	    if (key !== "constructor" && key !== "prototype" && key !== "name") {
	      var desc = (0, _getOwnPropertyDescriptor2["default"])(source, key);
	      (0, _defineProperty2["default"])(target, key, desc);
	    }
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	__webpack_require__(64);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(40);
	
	__webpack_require__(20)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	__webpack_require__(74);
	module.exports = __webpack_require__(77);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68);
	var Iterators = __webpack_require__(71);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(69)
	  , step             = __webpack_require__(70)
	  , Iterators        = __webpack_require__(71)
	  , toIObject        = __webpack_require__(40);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(72)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(46)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(32)
	  , hide           = __webpack_require__(33)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(71)
	  , $iterCreate    = __webpack_require__(73)
	  , setToStringTag = __webpack_require__(36)
	  , getProto       = __webpack_require__(11).getProto
	  , ITERATOR       = __webpack_require__(37)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(11)
	  , descriptor     = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(36)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(33)(IteratorPrototype, __webpack_require__(37)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(75)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(72)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(76)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(44)
	  , get      = __webpack_require__(78);
	module.exports = __webpack_require__(7).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(79)
	  , ITERATOR  = __webpack_require__(37)('iterator')
	  , Iterators = __webpack_require__(71);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(15)
	  , TAG = __webpack_require__(37)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(17);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(25);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(48);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _jquery = __webpack_require__(55);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _mixin2 = __webpack_require__(61);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _event = __webpack_require__(60);
	
	var _event2 = _interopRequireDefault(_event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var template = __webpack_require__(57);
	
	var TPL_SEARCH = '<div class="cdlist-search-container">' + '<input class="cdlist-search-input" value="<%= val %>" placeholder="<%= placeholder %>" />' + '<a href="javascript:void(0);" class="cdlist-search-action"><%= btnText %></a>' + '</div>';
	
	var _option = {
	  btnText: '搜索',
	  val: '',
	  placeholder: '',
	  resetList: ['pagination', 'filter', 'sort']
	};
	
	var _addonName = 'search';
	
	var Search = function (_mixin) {
	  (0, _inherits3["default"])(Search, _mixin);
	
	  function Search(option) {
	    (0, _classCallCheck3["default"])(this, Search);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, (Search.__proto__ || (0, _getPrototypeOf2["default"])(Search)).call(this));
	
	    if (option.historyEnable) {
	      option.historyKey = option.historyKey || 'query';
	    }
	
	    _this.option = (0, _assign2["default"])({}, _option, option);
	    return _this;
	  }
	
	  (0, _createClass3["default"])(Search, [{
	    key: '_triggerResetEvent',
	    value: function _triggerResetEvent(preventSet) {
	      var _this2 = this;
	
	      this.option.resetList.forEach(function (addonName) {
	        _this2.root.trigger(addonName + '.reset', [preventSet]);
	      });
	    }
	  }, {
	    key: 'getName',
	    value: function getName() {
	      return _addonName;
	    }
	
	    /**
	     * 获取存放 filter 的 container
	     */
	
	  }, {
	    key: '_getContainer',
	    value: function _getContainer() {
	      return this.option.container ? (0, _jquery2["default"])(this.option.container) : this.root.$topPluginContainer;
	    }
	
	    /**
	     * filter 的 view 渲染
	     */
	
	  }, {
	    key: 'initView',
	    value: function initView() {
	      var self = this;
	      var $container = self._getContainer();
	      $container.append((0, _jquery2["default"])(self._getHTML()));
	
	      this.$input = $container.find('.cdlist-search-input');
	      this.$btn = $container.find('.cdlist-search-action');
	
	      this._initEvent();
	    }
	
	    /**
	     * 注册事件
	     */
	
	  }, {
	    key: '_initEvent',
	    value: function _initEvent() {
	      var self = this;
	
	      // 检索点击
	      self._getContainer().delegate('.cdlist-search-action', 'click', function (e, preventSet) {
	        if (self._validateValue()) {
	          self._triggerResetEvent(preventSet);
	          self.root.trigger('reflow');
	
	          if (self.option.historyEnable && !preventSet) {
	            self.root.setHistory(self.option.historyKey, self.getAddonData());
	          }
	        }
	      });
	
	      self._getContainer().delegate('.cdlist-search-input', 'keydown', function (e, preventSet) {
	        if (e.keyCode == 13) {
	          if (self._validateValue()) {
	            self._triggerResetEvent(preventSet);
	            self.root.trigger('reflow');
	
	            if (self.option.historyEnable && !preventSet) {
	              self.root.setHistory(self.option.historyKey, self.getAddonData());
	            }
	          }
	        }
	      });
	    }
	
	    /**
	     * 验证 value 值
	     */
	
	  }, {
	    key: '_validateValue',
	    value: function _validateValue() {
	      var val = this.getAddonData();
	
	      if (!this.option.regex) {
	        return true;
	      } else {
	        var regex = new RegExp(this.option.regex);
	
	        if (regex.test(val)) {
	          return true;
	        } else {
	          this._onError(val);
	          return false;
	        }
	      }
	    }
	  }, {
	    key: '_onError',
	    value: function _onError(val) {
	      this.trigger('error', [val]);
	    }
	
	    /**
	     * 重置 search addon
	     */
	
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.$input.val("");
	    }
	
	    /**
	     * 渲染 search html 数据
	     */
	
	  }, {
	    key: '_getHTML',
	    value: function _getHTML() {
	      this._dealSearchData();
	
	      return template(TPL_SEARCH, this.option);
	    }
	
	    /**
	     * 处理数据默认数据
	     */
	
	  }, {
	    key: '_dealSearchData',
	    value: function _dealSearchData() {
	      var option = this.option;
	
	      if (option.value !== undefined) {
	        return;
	      }
	
	      if (option.historyEnable) {
	        var historyValue = this.root.getHistoryValue(this.option.historyKey);
	
	        if (historyValue) {
	          this.option.val = historyValue;
	        }
	      }
	    }
	  }, {
	    key: 'setValue',
	    value: function setValue(value, preventHistory) {
	      var oriValue = this.getAddonData();
	
	      if (value == oriValue) {
	        return;
	      }
	      this.$input.val(value);
	      this.$btn.trigger('click', [preventHistory]);
	    }
	
	    /**
	     * 设置 addon 的 root 对象
	     */
	
	  }, {
	    key: 'setRoot',
	    value: function setRoot(root) {
	      var _this3 = this;
	
	      this.root = root;
	
	      // 如果可以改变 hash
	      if (this.option.historyEnable) {
	        this.root.on('hashchange', function (e, hashData) {
	          var historyValue = _this3.root.getHistoryValue(_this3.option.historyKey);
	
	          _this3.setValue(historyValue, true);
	        });
	      }
	    }
	
	    /**
	     * 获取 addon 提供的 url 数据
	     */
	
	  }, {
	    key: 'getAddonData',
	    value: function getAddonData() {
	      return this.$input.val();
	    }
	  }]);
	  return Search;
	}((0, _mixin3["default"])(_event2["default"]));
	
	exports["default"] = Search;
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _template = __webpack_require__(57);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _jquery = __webpack_require__(55);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var TPL_SORT = '<div class="cdlist-sort-container">' + '<ul>' + '<% for (var i = 0; i < datas.length; i++) { %>' + '<li class="cdlist-sort-item <% if (activeIndex == i) { %>cdlist-sort-item-active<% } %> ' + '<% if (activeIndex == i && datas[activeIndex].types) { %> cdlist-sort-type-<%=datas[activeIndex].types[datas[activeIndex].activeIndex]%> <% } %>" ' + '<% if (activeIndex == i && datas[activeIndex].types) { %>data-sort-type="<%=datas[activeIndex].types[datas[activeIndex].activeIndex]%>" <% } %>" ' + 'data-sort-key="<%= datas[i].key %>">' + '<span><%= datas[i].name %></span>' + '</li>' + '<% } %>' + '</ul>' + '</div>';
	
	/**
	 * sort addons provides a way to sort the table's results
	 * you can define UI by yourself, or use built in dom structure
	 *
	 * @param {object}   option sort      addon option
	 * @param {string}   option.container the container of addon
	 * @param {[object]} option.datas     the datas of sort, it must be with the right format
	 * eg. [{
	 *   key: 'default',                  // the key of a item
	 *   name: 'defaul'                   // the display name of a item
	 },{
	 *   key: 'time',
	 *   name: 'time sorting',
	 *   types: [                          // type is meant to provide different way of sorting
	 *     cdlist.addons.Rank.Const.ASC,  // from low to high
	 *     cdlist.addons.Rank.Const.DESC // from high to low
	 *   ]
	 * }]
	 */
	var _addonName = 'sort';
	
	var _option = {
	  historyKey: 'sort',
	  historyTypeKey: 'sort_type',
	  resetList: ['pagination']
	};
	
	var Sort = function () {
	  function Sort(option) {
	    (0, _classCallCheck3["default"])(this, Sort);
	
	    this.option = (0, _assign2["default"])({}, _option, option);
	  }
	
	  (0, _createClass3["default"])(Sort, [{
	    key: 'getName',
	    value: function getName() {
	      return _addonName;
	    }
	  }, {
	    key: '_getContainer',
	    value: function _getContainer() {
	      return this.option.container ? (0, _jquery2["default"])(this.option.container) : this.root.$topPluginContainer;
	    }
	  }, {
	    key: '_triggerResetEvent',
	    value: function _triggerResetEvent(preventHistory) {
	      var _this = this;
	
	      this.option.resetList.forEach(function (addonName) {
	        _this.root.trigger(addonName + '.reset', [preventHistory]);
	      });
	    }
	  }, {
	    key: 'initView',
	    value: function initView() {
	      var self = this;
	      var $container = self._getContainer();
	      $container.append((0, _jquery2["default"])(self._getHTML()));
	
	      this.$activeItems = $container.find('.cdlist-sort-item-active');
	
	      this._initEvent();
	    }
	  }, {
	    key: '_initEvent',
	    value: function _initEvent() {
	      var self = this;
	
	      self._getContainer().delegate('.cdlist-sort-item', 'click', function () {
	        self._dealItem((0, _jquery2["default"])(this));
	      });
	
	      self.root.on('sort.reset', function (e, preventDisptach) {
	        self.reset(preventDisptach);
	      });
	    }
	  }, {
	    key: 'activeSort',
	    value: function activeSort(key, type, preventHistory) {
	      var $item = this._getContainer().find('.cdlist-sort-item[data-sort-key=' + key + ']');
	      var filterData = this._findDataItem(key);
	
	      if (!$item.length || !filterData) {
	        return;
	      }
	
	      // 如果当前改变的 sort item 跟之前的不一致
	      // 则重置现有的 item
	      if (this.$activeItems && this.$activeItems.get(0) != $item.get(0)) {
	        this._resetItem(this.$activeItems);
	        this.$activeItems = $item.addClass('cdlist-sort-item-active');
	
	        if (!preventHistory) {
	          this.root.setHistory(this.option.historyKey, key);
	        }
	      }
	
	      // type 存在且在 filterData 中有
	      if (type && filterData.types && filterData.types.indexOf(type) > -1) {
	        // 移除当前的type
	        var currentType = $item.data('sort-type');
	        currentType && $item.removeClass('cdlist-sort-type-' + currentType);
	
	        // 不相等才进行设置
	        if (currentType != type) {
	          // 加入现在的 type
	          $item.addClass('cdlist-sort-type-' + type).data('sort-type', type);
	
	          if (!preventHistory) {
	            if (type && filterData.types && filterData.types.indexOf(type) > -1) {
	              this.root.setHistory(this.option.historyTypeKey, type);
	            } else {
	              this.root.removeHistory(this.option.historyTypeKey);
	            }
	          }
	        }
	      } else {
	        if (!preventHistory) {
	          this.root.removeHistory(this.option.historyTypeKey);
	        }
	      }
	
	      return this._triggerChange(preventHistory);
	    }
	
	    /**
	     * deal click event for a sorting item
	     */
	
	  }, {
	    key: '_dealItem',
	    value: function _dealItem($item) {
	      var self = this,
	          key = $item.data('sort-key'),
	          nextIndex,
	          nextType;
	
	      var dataItem = self._findDataItem(key);
	
	      // 找到要active的type值
	      if (dataItem.types) {
	        var currentType = $item.data('sort-type'),
	            index = dataItem.types.indexOf(currentType);
	
	        // 获得要变成的 type
	        if (index == -1) {
	          nextIndex = 0;
	        } else {
	          nextIndex = index + 1 == dataItem.types.length ? 0 : index + 1;
	        }
	        nextType = dataItem.types[nextIndex];
	      }
	
	      this.activeSort(key, nextType);
	    }
	
	    /**
	     * reset a sort dom when current sort dom is not equal to the last
	     */
	
	  }, {
	    key: '_resetItem',
	    value: function _resetItem($lastDom) {
	      $lastDom.removeClass('cdlist-sort-item-active');
	      $lastDom.removeClass('cdlist-sort-type-' + $lastDom.data('sort-type'));
	      $lastDom.data('sort-type', null);
	    }
	
	    /**
	     * trigger sort change event
	     */
	
	  }, {
	    key: '_triggerChange',
	    value: function _triggerChange(preventHistory) {
	      this._triggerResetEvent(preventHistory);
	      this.root.trigger('reflow');
	    }
	
	    /**
	     * find user defined data item
	     */
	
	  }, {
	    key: '_findDataItem',
	    value: function _findDataItem(key) {
	      var filterTypes = this.option.datas.filter(function (item) {
	        return item.key == key;
	      });
	
	      return filterTypes[0];
	    }
	  }, {
	    key: '_getHTML',
	    value: function _getHTML() {
	      this._dealSortData();
	
	      return (0, _template2["default"])(TPL_SORT, {
	        datas: this.option.datas,
	        activeIndex: this.option.activeIndex
	      });
	    }
	  }, {
	    key: '_dealSortData',
	    value: function _dealSortData() {
	      var option = this.option;
	
	      if (option.activeIndex !== undefined) {
	        option.activeIndex = option.activeIndex || 0;
	        var itemData = option.datas[option.activeIndex];
	        itemData.activeIndex = itemData.activeIndex || 0;
	        return;
	      }
	
	      // 设置默认的 active 状态
	      if (option.historyEnable) {
	        var key = this.root.getHistoryValue(option.historyKey);
	        var typeKey = this.root.getHistoryValue(option.historyTypeKey);
	        var item = this._findDataItem(key);
	        var activeIndex, activeTypeIndex;
	
	        if (item) {
	          this.option.activeIndex = activeIndex = this.option.datas.indexOf(item);
	        } else {
	          this.option.activeIndex = activeIndex = 0;
	          item = option.datas[activeIndex];
	        }
	
	        if (typeKey && item.types) {
	          item.types.forEach(function (type, index) {
	            if (type == typeKey) {
	              item.activeIndex = index;
	            }
	          });
	        } else {
	          item.activeIndex = 0;
	        }
	      }
	    }
	  }, {
	    key: 'setRoot',
	    value: function setRoot(root) {
	      var _this2 = this;
	
	      this.root = root;
	
	      // 如果可以改变 hash
	      if (this.option.historyEnable) {
	        this.root.on('hashchange', function (e, hashData) {
	          var key = _this2.root.getHistoryValue(_this2.option.historyKey) || _this2.option.datas[_this2.option.activeIndex].key;
	
	          var item = _this2._findDataItem(key);
	          var type = _this2.root.getHistoryValue(_this2.option.historyTypeKey);
	
	          if (!type && item.types) {
	            type = item.types[item.activeIndex];
	          }
	
	          _this2.activeSort(key, type, true);
	        });
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset(preventDisptach) {
	      var defaultSort = this.option.datas[0];
	
	      this.activeSort(defaultSort.key, defaultSort.types && defaultSort.types[0], preventDisptach);
	    }
	  }, {
	    key: 'getAddonData',
	    value: function getAddonData() {
	      var self = this,
	          $item = self._getContainer().find('.cdlist-sort-item-active'),
	          data;
	
	      if ($item.length > 0) {
	        data = {
	          key: $item.data('sort-key'),
	          type: $item.data('sort-type')
	        };
	      }
	
	      return data;
	    }
	  }]);
	  return Sort;
	}();
	
	Sort.SORT_MAP = {
	  ASC: 'asc',
	  DESC: 'desc'
	};
	
	exports["default"] = Sort;
	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(17);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(25);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(48);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _history = __webpack_require__(83);
	
	var _history2 = _interopRequireDefault(_history);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
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
	
	  if (this.canHistory) {
	    try {
	      if (replace) {
	        history.replaceState('', '', url);
	      } else {
	        history.pushState('', '', url);
	      }
	    } catch (e) {
	      window.location[replace ? 'assign' : 'replace'](url);
	    }
	  } else {
	    window.location.href = url;
	  }
	}
	
	/**
	 * cover // to /
	 */
	function cleanPath(path) {
	  return path.replace(/\/\//g, '/');
	}
	
	var HTML5History = function (_History) {
	  (0, _inherits3["default"])(HTML5History, _History);
	
	  function HTML5History(base, option) {
	    (0, _classCallCheck3["default"])(this, HTML5History);
	
	    var _this = (0, _possibleConstructorReturn3["default"])(this, (HTML5History.__proto__ || (0, _getPrototypeOf2["default"])(HTML5History)).call(this, base, option));
	
	    _this._listenPop();
	    return _this;
	  }
	
	  (0, _createClass3["default"])(HTML5History, [{
	    key: '_listenPop',
	    value: function _listenPop() {
	      var _this2 = this;
	
	      window.addEventListener('popstate', function (e) {
	        _this2.cb(_this2.getState());
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
	      pushState.call(this, cleanPath(this.base + url));
	    }
	  }, {
	    key: 'replace',
	    value: function replace(url) {
	      pushState.call(this, cleanPath(this.base + url), true);
	    }
	  }]);
	  return HTML5History;
	}(_history2["default"]);
	
	exports["default"] = HTML5History;
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(21);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(22);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	/**
	 * cd-list History api
	 */
	function normalizeBase(base) {
	  if (!base) {
	    var baseEl = document.querySelector('base');
	    base = baseEl ? baseEl.getAttribute('href') : '/';
	  }
	
	  if (base[0] !== '/') {
	    base = '/' + base;
	  }
	
	  return base.replace(/\/$/, '');
	}
	
	var History = function () {
	  (0, _createClass3["default"])(History, [{
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
	    var option = arguments[1];
	    (0, _classCallCheck3["default"])(this, History);
	
	    option = option || {};
	
	    this.base = normalizeBase(base);
	
	    if (option.disableHistory) {
	      this.canHistory = false;
	    } else {
	      this.canHistory = !!window.history.pushState;
	    }
	  }
	
	  (0, _createClass3["default"])(History, [{
	    key: 'listen',
	    value: function listen() {
	      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
	
	      this.cb = cb;
	    }
	  }]);
	  return History;
	}();
	
	exports["default"] = History;
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getParamStr = function getParamStr(url) {
	  if (!url) {
	    return;
	  }
	  var urlParts = url.split("?");
	  var pathname = urlParts[0];
	  var urlParamString = url.substring(pathname.length + 1, url.length);
	  return urlParamString;
	};
	
	var getParams = function getParams(url) {
	  var params = [];
	  var urlParamString = getParamStr(url);
	  if (!urlParamString) {
	    return params;
	  }
	  params = urlParamString.split("&");
	  return params;
	};
	
	var getParamMap = function getParamMap(url) {
	  var map = {};
	
	  var params = getParams(url);
	
	  params.forEach(function (val, index) {
	    var kvs = val.split("=");
	    var paramName = kvs[0];
	    var value = val.substring(paramName.length + 1, val.length);
	    map[paramName] = value;
	  });
	
	  return map;
	};
	
	var getParam = function getParam(url, key) {
	  var map = getParamMap(url);
	  return map[key];
	};
	
	var addParam = function addParam(url, paramStr) {
	  if (getParamStr(url)) {
	    url = url + "&" + paramStr;
	  } else {
	    url = url + "?" + paramStr;
	  }
	  return url;
	};
	
	var url = {
	  getParamMap: getParamMap,
	  addParam: addParam,
	  getParam: getParam
	};
	
	exports["default"] = url;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cdlist.js.map