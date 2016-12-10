import History from './history'

/**
 * remove base path
 */
function getLocation (base) {
  let path = window.location.pathname
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search + window.location.hash
}

/**
 * pushState
 */
function pushState (url, replace = false) {
  const history = window.history
  try {
    if (replace) {
      history.replaceState('', '', url)
    } else {
      history.pushState('', '', url)
    }
  } catch (e) {
    window.location[replace ? 'assign' : 'replace'](url)
  }
}

/**
 * cover // to /
 */
function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

export default class HTML5History extends History {
  constructor (base, cb) {
    super(base, cb);

    this._listenPop();
  }

  _listenPop () {
    window.addEventListener('popstate', e => {
      this.cb(this.getState());
    })
  }

  go (n) {
    window.history.go(n)
  }

  getState () {
    let state = {
      hash: getLocation(this.base)
    };

    return state;
  }

  push (url) {
    pushState(cleanPath(this.base + url));
  }

  replace (url) {
    pushState(cleanPath(this.base + url), true);
  }
}
