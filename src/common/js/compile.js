import { Watcher } from './watcher'
export function Compile(el, vm) { // options.el || document.body, this
  this.$vm = vm
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)

  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  node2Fragment(el) {
    let fragment = document.createDocumentFragment(),
      child

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }

    return fragment
  },

  init() {
    this.compileElement(this.$fragment)
  },

  compileElement(el) {
    let childNodes = el.childNodes,
      me = this;

    [].slice.call(childNodes).forEach(node => {
      const text = node.textContent
      const reg = /\{\{(.*)\}\}/

      if (me.isElementNode(node)) {
        me.compile(node)
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1)
      }

      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node)
      }
    })
  },

  compile(node) {
    let nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      if (me.isDirective(attrName)) {
        const exp = attr.value
        const dir = attrName.substring(2)
        // 事件指令
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir)
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
        }

        node.removeAttribute(attrName)
      }
    })
  },

  compileText(node, exp) {
    compileUtil.text(node, this.$vm, exp)
  },

  isDirective(attr) {
    return attr.indexOf('v-') == 0
  },

  isEventDirective(dir) {
    return dir.indexOf('on') === 0
  },

  isElementNode(node) { // 元素节点
    return node.nodeType === 1
  },

  isTextNode(node) { // 文本节点
    return node.nodeType === 3
  }
}

// 指令处理集合
var compileUtil = {
  text(node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },

  html(node, vm, exp) {
    this.bind(node, vm, exp, 'html')
  },
  show(node, vm, exp) {
    this.bind(node, vm, exp, 'show')
  },
  model(node, vm, exp) {
    this.bind(node, vm, exp, 'model')

    let me = this,
      val = this._getVMVal(vm, exp)
    node.addEventListener('input', e => {
      const newValue = e.target.value
      if (val === newValue) {
        return
      }

      me._setVMVal(vm, exp, newValue)
      val = newValue
    })
  },

  class(node, vm, exp) {
    this.bind(node, vm, exp, 'class')
  },

  bind(node, vm, exp, dir) {
    const updaterFn = updater[dir + 'Updater']

    updaterFn && updaterFn(node, this._getVMVal(vm, exp))

    new Watcher(vm, exp, (value, oldValue) => {
      updaterFn && updaterFn(node, value, oldValue)
    })
  },

  // 事件处理
  eventHandler(node, vm, exp, dir) {
    let eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[exp]

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },

  _getVMVal(vm, exp) {
    let val = vm
    exp = exp.split('.')
    exp.forEach(k => {
      val = val[k]
    })
    return val
  },

  _setVMVal(vm, exp, value) {
    let val = vm
    exp = exp.split('.')
    exp.forEach((k, i) => {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k]
      } else {
        val[k] = value
      }
    })
  }
}


var updater = {
  textUpdater(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  },
  showUpdater(node, value){
    value ? node.style.display = "block" : node.style.display = "none";
  },
  htmlUpdater(node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value
  },

  classUpdater(node, value, oldValue) {
    let className = node.className
    className = className.replace(oldValue, '').replace(/\s$/, '')

    const space = className && String(value) ? ' ' : ''

    node.className = className + space + value
  },

  modelUpdater(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value
  }
}
