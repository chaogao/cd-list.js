var $ = require('jquery')
var search = require('./addons/search.js')

import EventMixin from './tools/event.js'
import HTML5History from './tools/history_h5.js'
import mixin from './tools/mixin.js'

class CdList extends mixin(EventMixin) {
  constructor(option, el) {
    super();

    this.option = option;
    this.$el = $(el).addClass('cdlist-root-container');

    setTimeout(() => {
      this.trigger('created');
    }, 10);
  }
}

CdList.addons = {
  search: search
};

export default CdList;
