import $ from 'jquery'
var template = require('../template');
var PaginationTool = require('../tools/pagination.js');

var TPL_PA = '<div class="cdlist-pagination-container"></div>';

let _addonName = 'pagination';

export default class Pagination {
  constructor (option) {
    // 设置默认的 historyKey
    if (option.historyEnable) {
      option.historyKey = option.historyKey || 'page';
    }

    this.option = option;
  }

  getName () {
    return _addonName;
  }

  /**
   * 获取存放 addons 的 container
   */
  _getContainer () {
    return this.option.container ? $(this.option.container) : this.root.$bottomPluginContainer;
  }

  /**
   * addons 的 view 渲染
   */
  initView () {
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
  _initView (json) {
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

      $(self._pageInstance).on('page', function (e) {
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
  _initEvent () {
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
  reset () {
    this._pageInstance && this._pageInstance.destroy();
    this._pageInstance = null;
  }

  /**
   * 设置 addon 的 root 对象
   */
  setRoot (root) {
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
  getAddonData () {
    var page = this._pageInstance ? this._pageInstance.getPage() :
      (this.savedIndex !== undefined && parseInt(this.savedIndex)) || this._initPage || 0;

    return page;
  }
}
