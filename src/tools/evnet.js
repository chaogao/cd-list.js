var handlers = {},
  _zid = 1;

// 事件对象
function returnFalse () {
  return false;
};

function returnTrue () {
  return true;
};

function Event (name, data) {
  this.type = this.name = name;
  data && $.extend(this, data);
};

Event.prototype = {
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  preventDefault: function() {
    this.isDefaultPrevented = returnTrue;
  },
  stopPropagation: function() {
    this.isPropagationStopped = returnTrue;
  }
};

/**
 * 为上下文生成唯一 zid, 用于事件检索
 * @private
 */
function zid (context) {
  return context._zid || (context._zid = _zid++)
}

/**
 * 查询 handler
 * @private
 */
function findHandlers(context, name, fn) {
  return (handlers[zid(context)] || []).filter(function(handler) {
    return handler && (!name || name == handler.name)
      && (!fn || fn == handler.fn);
  });
}

export {Event}

export default let EventMixin = {
  /**
   * 添加事件
   * @param {string}   name      事件名称
   * @param {function} fn        回调逻辑
   * @param {object}   [context] 处理回调的上下文
   */
  on: function (name, fn, context) {
    var id = zid(this),
      set = (handlers[id] || (handlers[id] = []));

    context = context || this;   // 绑定上下文

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
  off: function (name, fn, context) {
    var id = zid(this);

    findHandlers(this, name, fn).forEach(function (handler) {
      delete handlers[id][handler.i];
    });
  },
  /**
   * 触发事件
   */
  trigger: function (name, data) {
    var id = zid(this),
      e;

    e = typeof(name) == "object" ? name : new Event(name);

    name = (name && name.type) || name;

    findHandlers(this, name).forEach(function (handler) {

      if (handler.fn.apply(handler.context, [e].concat(data)) === false
          || (e.isPropagationStopped && e.isPropagationStopped())) {
        return false;
      };
    });

    return e;
  }
}
