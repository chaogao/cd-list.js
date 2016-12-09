/**
 * cd-list History api
 */
function normalizeBase (base) {
  if (!base) {
    const baseEl = document.querySelector('base')
    base = baseEl ? baseEl.getAttribute('href') : '/'
  }

  if (base.charAt(0) !== '/') {
    base = '/' + base
  }

  return base.replace(/\/$/, '')
}

export default class History {

  go () {
    throw 'need implemented'
  }

  push () {
    throw 'need implemented'
  }

  replace () {
    throw 'need implemented'
  }

  constructor (base = '/', cb) {
    this.base = normalizeBase(base)
    this.listend(cb);
  }

  listen (cb = ()=>{}) {
    this.cb = cb
  }
}
