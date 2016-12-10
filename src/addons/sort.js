import template from '../template';
import $ from 'jquery';

var TPL_SORT = '<div class="cdtable-sort-container">' +
  '<ul>' +
    '<% for (var i = 0; i < datas.length; i++) { %>' +
      '<li class="cdtable-sort-item" data-sort-key="<%= datas[i].key %>">' +
        '<span><%= datas[i].name %></span>' +
      '</li>' +
    '<% } %>' +
  '</ul>' +
'</div>';

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
 *     cdtable.addons.Rank.Const.ASC,  // from low to high
 *     cdtable.addons.Rank.Const.DESC // from high to low
 *   ]
 * }]
 */
let _addonName = 'sort';

let _option = {};

class Sort {
  constructor (option) {
    this.option = Object.assign({}, _option, option);
  }

  getName () {
    return _addonName;
  }

  /**
   * get the container of addon
   */
  _getContainer () {
    return this.option.container ? $(this.option.container) : this.root.$topPluginContainer;
  }

  /**
   * render addon's view
   */
  initView () {
    var self = this;
    var $container = self._getContainer();
    $container.append($(self._getHTML()));

    this._initEvent();
  }

  /**
   * registe event
   */
  _initEvent () {
    var self = this;

    self._getContainer().delegate('.cdtable-sort-item', 'click', function () {
      self._dealItem($(this));
    });
  }

  /**
   * deal click event for a sorting item
   */
  _dealItem ($item) {
    var self = this,
      key = $item.data('sort-key');

    var dataItem = self._findDataItem(key);

    if (!dataItem) {
      return;
    }

    if (self.$activeItems && (self.$activeItems.get(0) != $item.get(0))) {
      self._resetItem(self.$activeItems);
    }

    self.$activeItems = $item.addClass('cdtable-sort-item-active');

    // no type, it direct trigger event
    if (!dataItem.types) {
      return self._triggerChange();
    }

    var currentType = $item.data('sort-type');
    var index = dataItem.types.indexOf(currentType);
    var nextIndex, nextType;

    // get nextIndex, nextType
    if (index == -1) {
      nextIndex = 0;
    } else {
      nextIndex = index + 1 == dataItem.types.length ? 0 : index + 1;
    }
    var nextType = dataItem.types[nextIndex];

    // remove current type class, add next class
    currentType && $item.removeClass('cdtable-sort-type-' + currentType);
    $item.addClass('cdtable-sort-type-' + nextType).data('sort-type', nextType);

    // user defined callback to update UI
    self.option.onChange && self.option.onChange({
      target: $item,
      type: nextType
    });

    self._triggerChange();
  }

  /**
   * reset a sort dom, when current sort dom is not equal to the last
   */
  _resetItem ($lastDom) {
    $lastDom.removeClass('cdtable-sort-item-active');
    $lastDom.removeClass('cdtable-sort-type-' + $lastDom.data('sort-type'));
    $lastDom.data('sort-type', undefined);
  }

  /**
   * trigger sort change event
   */
  _triggerChange () {
    this.root.trigger('sort.change');
    this.root.trigger('reflow');
  }

  /**
   * find user defined data item
   */
  _findDataItem (key) {
    var filterTypes = this.option.datas.filter(function (item) {
      return item.key == key;
    });

    return filterTypes[0];
  }

  /**
   * get addon HTML
   */
  _getHTML () {
    var datas = this.option.datas;

    return template(TPL_SORT, {datas: datas});
  }

  /**
   * 设置 addon 的 root 对象
   */
  setRoot (root) {
    this.root = root;
  }

  /**
   * 重置 filter 所有的 select
   */
  reset () {
    this._getContainer().find('select').each(function () {
      $(this).prop('selectedIndex', 0);
    });
  }

  /**
   * 获取 addon 提供的 url 数据
   */
  getAddonData () {
    var self = this,
      $item = self._getContainer().find('.cdtable-sort-item-active'),
      data;

    if ($item.length > 0) {
      data = {
        key: $item.data('sort-key'),
        type: $item.data('sort-type')
      }
    }

    return data;
  }
}

Sort.SORT_MAP = {
 ASC: 'asc',
 DESC: 'desc'
}

export default Sort;
