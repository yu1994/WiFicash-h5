import { observe } from './observer'
import { Compile } from './compile'
export function MVVM(options) {
  this.$options = options
  let data = this._data = this.$options.data, me = this
  Object.keys(data).forEach(key => {
    me._proxy(key)
  })
  observe(data, this)
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  _proxy(key) {
    const me = this
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return me._data[key]
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal
      }
    })
  }
};


