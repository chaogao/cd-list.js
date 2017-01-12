var template = require('../template');

import $ from 'jquery'
import mixin from '../tools/mixin.js';
import EventMixin from '../tools/event.js';

let TPL_SEARCH = '<div class="cdlist-search-container">' +
  '<input class="cdlist-search-input" value="<%= val %>" placeholder="<%= placeholder %>" />' +
  '<a href="javascript:void(0);" class="cdlist-search-action"><%= btnText %></a>' +
'</div>';

let _option = {
  btnText: '搜索',
  val: '',
  placeholder: '',
  resetList: ['pagination', 'filter', 'sort']
}

let _addonName = 'search'

export default class Search extends mixin(EventMixin) {
  constructor (option) {
    super();

    if (option.historyEnable) {
      option.historyKey = option.historyKey || 'query';
    }

    this.option = Object.assign({}, _option, option);
  }

  _triggerResetEvent (preventSet) {
    this.option.resetList.forEach((addonName) => {
      this.root.trigger(addonName + '.reset', [preventSet])
    });
  }

  getName () {
    return _addonName;
  }

  /**
   * 获取存放 filter 的 container
   */
  _getContainer () {
    return this.option.container ? $(this.option.container) : this.root.$topPluginContainer;
  }

  /**
   * filter 的 view 渲染
   */
  initView () {
    var self = this;
    var $container = self._getContainer();
    $container.append($(self._getHTML()));

    this.$input = $container.find('.cdlist-search-input');
    this.$btn = $container.find('.cdlist-search-action');

    this._initEvent();
  }

  /**
   * 注册事件
   */
  _initEvent () {
    var self = this;

    // 检索点击
    self._getContainer().delegate('.cdlist-search-action', 'click', function (e, preventSet) {
      if (self._validateValue()) {
        self.root.trigger('reflow');

        if (self.option.historyEnable && !preventSet) {
          self.root.setHistory(self.option.historyKey, self.getAddonData());
        }

        // 未开启 history 模式总是重置，开启时非preventSet时才重置
        if (self.option.historyEnable && !preventSet) {
          self._triggerResetEvent(preventSet);
        } else if (!self.option.historyEnable) {
          self._triggerResetEvent(preventSet);
        }

        self.option.onChange && self.option.onChange();
      }
    });

    self._getContainer().delegate('.cdlist-search-input', 'keydown', function (e, preventSet) {
      if (e.keyCode == 13) {
        if (self._validateValue()) {
          self.root.trigger('reflow');

          if (self.option.historyEnable && !preventSet) {
            self.root.setHistory(self.option.historyKey, self.getAddonData());
          }

          // 未开启 history 模式总是重置，开启时非preventSet时才重置
          if (self.option.historyEnable && !preventSet) {
            self._triggerResetEvent(preventSet);
          } else if (!self.option.historyEnable) {
            self._triggerResetEvent(preventSet);
          }

          self.option.onChange && self.option.onChange();
        }
      }
    });
  }

  /**
   * 验证 value 值
   */
  _validateValue () {
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

  _onError (val) {
    this.trigger('error', [val])
  }

  /**
   * 重置 search addon
   */
  reset () {
    this.$input.val("");
  }

  /**
   * 渲染 search html 数据
   */
  _getHTML () {
    this._dealSearchData();

    return template(TPL_SEARCH, this.option);
  }

  /**
   * 处理数据默认数据
   */
  _dealSearchData () {
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

  setValue (value, preventHistory) {
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
  setRoot (root) {
    this.root = root;

    // 如果可以改变 hash
    if (this.option.historyEnable) {
      this.root.on('hashchange', (e, hashData) => {
        var historyValue = this.root.getHistoryValue(this.option.historyKey);

        this.setValue(historyValue, true);
      });
    }
  }

  /**
   * 获取 addon 提供的 url 数据
   */
  getAddonData () {
    return this.$input.val();
  }
}
