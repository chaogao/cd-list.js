(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("CdList", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["CdList"] = factory(require("jQuery"));
	else
		root["CdList"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _filter = __webpack_require__(2);
	
	var _filter2 = _interopRequireDefault(_filter);
	
	var _pagination = __webpack_require__(4);
	
	var _pagination2 = _interopRequireDefault(_pagination);
	
	var _search = __webpack_require__(6);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _sort = __webpack_require__(9);
	
	var _sort2 = _interopRequireDefault(_sort);
	
	var _event = __webpack_require__(8);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _history_h = __webpack_require__(10);
	
	var _history_h2 = _interopRequireDefault(_history_h);
	
	var _mixin2 = __webpack_require__(7);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _url = __webpack_require__(12);
	
	var _url2 = _interopRequireDefault(_url);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	  _inherits(CdList, _mixin);
	
	  function CdList(option, el) {
	    _classCallCheck(this, CdList);
	
	    var _this = _possibleConstructorReturn(this, (CdList.__proto__ || Object.getPrototypeOf(CdList)).call(this));
	
	    _this.option = Object.assign({}, _option, option);
	    _this.$el = (0, _jquery2.default)(el).addClass('cdlist-root-container');
	
	    _this._bindHistory();
	    _this._initEvent();
	
	    _this.setAddons(option.addons);
	    return _this;
	  }
	
	  _createClass(CdList, [{
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
	      var param = _jquery2.default.param(historyOpt);
	
	      console.log('push:' + param);
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
	     * every cdlist will listen history, and disptach change events
	     * but addon can decide whether to response this event self
	     */
	
	  }, {
	    key: '_bindHistory',
	    value: function _bindHistory() {
	      var _this5 = this;
	
	      var self = this,
	          state,
	          historyOpt;
	
	      var option = Object.assign({}, DEFAULT_HISTORY_CONF, self.option.historyOption);
	
	      this.history = new _history_h2.default(option.base, {
	        disableHistory: this.option.disableHistory
	      });
	
	      // get init history state
	      var state = this.history.getState();
	      var hash = decodeURIComponent(state.hash);
	      hash && (this.historyOpt = tools.url.getParamMap(hash));
	
	      this.history.listen(function (state) {
	        var historyOpt = _this5.historyOpt = tools.url.getParamMap(decodeURIComponent(state.hash));
	
	        console.log(historyOpt);
	
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
	          console.warn('your addon ' + addon.getName() + ' is invaild');
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
	      return _jquery2.default.ajax({
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
	}((0, _mixin3.default)(_event2.default));
	
	CdList.addons = addons = {
	  Filter: _filter2.default,
	  Pagination: _pagination2.default,
	  Search: _search2.default,
	  Sort: _sort2.default
	};
	
	CdList.tools = tools = {
	  url: _url2.default
	};
	
	exports.default = CdList;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = __webpack_require__(3);
	
	var TPL_FILTER = '<div class="cdlist-filter-container">' + '<ul>' + '<% for (var i = 0; i < filters.length; i++) { %>' + '<li>' + '<span class="cdlist-filter-select-name"><%= filters[i].label %></span>' + '<select name=\'<%= filters[i].name %>\'>' + '<% for (var j = 0; j < filters[i].datas.length; j++) { %>' + '<option <% if (j == filters[i].activeIndex) { %>selected="selected"<% } %>  data-idx="<%= j %>" value=\'<%= filters[i].datas[j].value %>\'><%= filters[i].datas[j].name %></option>' + '<% } %>' + '</select>' + '</li>' + '<% } %>' + '</ul>' + '</div>';
	
	var TPL_FILTER_LINE = '<div class="cdlist-filter-container cdlist-filter-container-line">' + '<ul>' + '<% for (var i = 0; i < filters.length; i++) { %>' + '<li <% if (filters[i].className) { %>class="<%= filters[i].className %>" <% } %> >' + '<% if (filters[i].label) { %>' + '<div class="cdlist-filter-select-name"><%= filters[i].label %></div>' + '<% } %>' + '<ul class="cdlist-filter-raw-list">' + '<% for (var j = 0; j < filters[i].datas.length; j++) { %>' + '<li data-name="<%= filters[i].name %>" class="cdlist-filter-raw-item <% if (j == filters[i].activeIndex) { %>cdlist-filter-raw-item-active<% } %>" data-value="<%= filters[i].datas[j].value %>">' + '<a href="javascript:void(0)"><%= filters[i].datas[j].name %></a>' + '</li>' + '<% } %>' + '</ul>' + '</li>' + '<% } %>' + '</ul>' + '</div>';
	
	var _addonName = 'filter';
	var _option = {
	  resetList: ['pagination']
	};
	
	var Filter = function () {
	  function Filter(option) {
	    _classCallCheck(this, Filter);
	
	    this.option = Object.assign({}, _option, option);
	  }
	
	  _createClass(Filter, [{
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
	      return this.option.container ? (0, _jquery2.default)(this.option.container) : this.root.$topPluginContainer;
	    }
	  }, {
	    key: 'initView',
	    value: function initView() {
	      var self = this;
	      var $container = self._getContainer();
	
	      $container.append((0, _jquery2.default)(self._getHTML()));
	
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
	      self.root.on('filter.reset', function () {
	        self.reset();
	      });
	
	      // 发生改变立即进行重新请求
	      if (self.option.line) {
	        self._getContainer().delegate('.cdlist-filter-raw-item', 'click', function (e, preventSet) {
	          (0, _jquery2.default)(this).addClass('cdlist-filter-raw-item-active').siblings().removeClass('cdlist-filter-raw-item-active');
	
	          self._triggerResetEvent(preventSet);
	          self.root.trigger('reflow');
	
	          // 设置 filter 的 hash
	          if (self.option.historyEnable && !preventSet) {
	            var key = (0, _jquery2.default)(this).attr('data-name');
	            var value = (0, _jquery2.default)(this).attr('data-value');
	
	            self._setHash(key, value, true);
	          }
	        });
	      } else {
	        self._getContainer().delegate('select', 'change', function (e, preventSet) {
	          self._triggerResetEvent(preventSet);
	          self.root.trigger('reflow');
	
	          // 设置 filter 的 hash
	          if (self.option.historyEnable && !preventSet) {
	            var key = (0, _jquery2.default)(this).prop('name');
	            var value = (0, _jquery2.default)(this).val();
	
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
	    value: function reset() {
	      var _this2 = this;
	
	      this.option.filters.forEach(function (filter) {
	        _this2.setActive(filter.name, filter.datas[filter.resetIndex || 0].value);
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
	          data[(0, _jquery2.default)(this).attr('data-name')] = (0, _jquery2.default)(this).attr('data-value');
	        });
	      } else {
	        this._getContainer().find('select').each(function () {
	          data[(0, _jquery2.default)(this).prop('name')] = (0, _jquery2.default)(this).val();
	        });
	      }
	
	      return data;
	    }
	  }]);
	
	  return Filter;
	}();
	
	exports.default = Filter;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = tmpl;
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var template = __webpack_require__(3);
	var PaginationTool = __webpack_require__(5);
	
	var TPL_PA = '<div class="cdlist-pagination-container"></div>';
	
	var _addonName = 'pagination';
	
	var Pagination = function () {
	  function Pagination(option) {
	    _classCallCheck(this, Pagination);
	
	    // 设置默认的 historyKey
	    if (option.historyEnable) {
	      option.historyKey = option.historyKey || 'page';
	    }
	
	    this.option = option;
	  }
	
	  _createClass(Pagination, [{
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
	      return this.option.container ? (0, _jquery2.default)(this.option.container) : this.root.$bottomPluginContainer;
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
	
	        (0, _jquery2.default)(self._pageInstance).on('page', function (e) {
	          self.root.trigger('reflow');
	
	          // 设置 filter 的 hash
	          if (self.option.historyEnable && !self.preventSet) {
	            self.root.setHistory(self.option.historyKey, e.page, true);
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
	
	exports.default = Pagination;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _template = __webpack_require__(3);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var Pagination = function () {
	  function Pagination(element, option) {
	    _classCallCheck(this, Pagination);
	
	    var self = this;
	
	    self.element = $(element);
	    self.option = $.extend({}, _option, option);
	
	    self.generatePage();
	  }
	  /**
	   * @private
	   * @description 生成分页控件、包括html、event
	   */
	
	
	  _createClass(Pagination, [{
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
	      e = $.Event("page", { page: self.currentPage });
	
	      /**
	       * 设置page触发的事件，重复设置相同page会触发多次事件
	       * @event module:jsmod/ui/pagination#page
	       * @type {object}
	       * @property {int} page 当前设定的page值
	       */
	      if (!preventDisptach) {
	        $(self).trigger(e, [{ page: self.currentPage }]);
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
	
	      html = (0, _template2.default)(PAGE_TPL, { renderDatas: renderDatas });
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
	}();
	
	exports.default = Pagination;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _mixin2 = __webpack_require__(7);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _event = __webpack_require__(8);
	
	var _event2 = _interopRequireDefault(_event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var template = __webpack_require__(3);
	
	var TPL_SEARCH = '<div class="cdlist-search-container">' + '<input class="cdlist-search-input" value="<%= val %>" placeholder="<%= placeholder %>" />' + '<a href="javascript:void(0);" class="cdlist-search-action"><%= btnText %></a>' + '</div>';
	
	var _option = {
	  btnText: '搜索',
	  val: '',
	  placeholder: '',
	  resetList: ['pagination', 'filter', 'sort']
	};
	
	var _addonName = 'search';
	
	var Search = function (_mixin) {
	  _inherits(Search, _mixin);
	
	  function Search(option) {
	    _classCallCheck(this, Search);
	
	    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));
	
	    if (option.historyEnable) {
	      option.historyKey = option.historyKey || 'query';
	    }
	
	    _this.option = Object.assign({}, _option, option);
	    return _this;
	  }
	
	  _createClass(Search, [{
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
	      return this.option.container ? (0, _jquery2.default)(this.option.container) : this.root.$topPluginContainer;
	    }
	
	    /**
	     * filter 的 view 渲染
	     */
	
	  }, {
	    key: 'initView',
	    value: function initView() {
	      var self = this;
	      var $container = self._getContainer();
	      $container.append((0, _jquery2.default)(self._getHTML()));
	
	      this.$input = $container.find('.cdlist-search-input');
	
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
	          self._triggerResetEvent();
	          self.root.trigger('reflow');
	
	          if (self.option.historyEnable && !preventSet) {
	            self.root.setHistory(self.option.historyKey, self.getAddonData());
	          }
	        }
	      });
	
	      self._getContainer().delegate('.cdlist-search-input', 'keydown', function (e, preventSet) {
	        if (e.keyCode == 13) {
	          if (self._validateValue()) {
	            self._triggerResetEvent();
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
	
	      this.$input.val(value).trigger('click', [preventHistory]);
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
	}((0, _mixin3.default)(_event2.default));
	
	exports.default = Search;
	module.exports = exports['default'];

/***/ },
/* 7 */
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
/* 8 */
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
	  data && Object.assign(this, data);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _template = __webpack_require__(3);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	    _classCallCheck(this, Sort);
	
	    this.option = Object.assign({}, _option, option);
	  }
	
	  _createClass(Sort, [{
	    key: 'getName',
	    value: function getName() {
	      return _addonName;
	    }
	  }, {
	    key: '_getContainer',
	    value: function _getContainer() {
	      return this.option.container ? (0, _jquery2.default)(this.option.container) : this.root.$topPluginContainer;
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
	      $container.append((0, _jquery2.default)(self._getHTML()));
	
	      this.$activeItems = $container.find('.cdlist-sort-item-active');
	
	      this._initEvent();
	    }
	  }, {
	    key: '_initEvent',
	    value: function _initEvent() {
	      var self = this;
	
	      self._getContainer().delegate('.cdlist-sort-item', 'click', function () {
	        self._dealItem((0, _jquery2.default)(this));
	      });
	
	      self.root.on('sort.reset', function (e, preventDisptach) {
	        self.reset();
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
	     * reset a sort dom, when current sort dom is not equal to the last
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
	
	      return (0, _template2.default)(TPL_SORT, {
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
	    value: function reset() {
	      var defaultSort = this.option.datas[0];
	
	      this.activeSort(defaultSort.key, defaultSort.types && defaultSort.types[0]);
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
	
	exports.default = Sort;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _history = __webpack_require__(11);
	
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
	  _inherits(HTML5History, _History);
	
	  function HTML5History(base, option) {
	    _classCallCheck(this, HTML5History);
	
	    var _this = _possibleConstructorReturn(this, (HTML5History.__proto__ || Object.getPrototypeOf(HTML5History)).call(this, base, option));
	
	    _this._listenPop();
	    return _this;
	  }
	
	  _createClass(HTML5History, [{
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
	}(_history2.default);
	
	exports.default = HTML5History;
	module.exports = exports['default'];

/***/ },
/* 11 */
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
	
	  if (base[0] !== '/') {
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
	    var option = arguments[1];
	
	    _classCallCheck(this, History);
	
	    option = option || {};
	
	    this.base = normalizeBase(base);
	
	    if (option.disableHistory) {
	      this.canHistory = false;
	    } else {
	      this.canHistory = !!window.history.pushState;
	    }
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
/* 12 */
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
	
	exports.default = url;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cdlist.js.map