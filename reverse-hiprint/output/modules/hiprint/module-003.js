// webpack module 3
export default function (t, e, n) {
  'use strict'

  var i = (function () {
    return function () {}
  })()
  n.d(e, 'a', function () {
    return o
  })
  var o = (function () {
    function t(t) {
      ;((t = t || {}),
        (this.left = t.left),
        (this.top = t.top),
        (this.topInDesign = this.top),
        (this.height = t.height),
        (this.width = t.width),
        this.init(t))
    }
    return (
      (t.prototype.setDefault = function (t) {
        ;((this.defaultOptions = t), this.initSize())
      }),
      (t.prototype.initSize = function () {
        ;(this.width || this.setWidth(this.defaultOptions.width),
          this.height || this.setHeight(this.defaultOptions.height))
      }),
      (t.prototype.initSizeByHtml = function (t, e) {
        ;(this.width || this.setWidth(t), this.height || this.setHeight(e))
      }),
      (t.prototype.getLeft = function () {
        return this.left
      }),
      (t.prototype.displayLeft = function () {
        return this.left + 'pt'
      }),
      (t.prototype.setLeft = function (t) {
        null != t && (this.left = t)
      }),
      (t.prototype.getTop = function () {
        return this.top
      }),
      (t.prototype.getTopInDesign = function () {
        return this.topInDesign
      }),
      (t.prototype.displayTop = function () {
        return this.top + 'pt'
      }),
      (t.prototype.setTop = function (t) {
        null != t && (this.top = t)
      }),
      (t.prototype.copyDesignTopFromTop = function () {
        this.topInDesign = this.top
      }),
      (t.prototype.getHeight = function () {
        return this.height
      }),
      (t.prototype.displayHeight = function () {
        return this.height + 'pt'
      }),
      (t.prototype.setHeight = function (t) {
        null != t && (this.height = t)
      }),
      (t.prototype.getWidth = function () {
        return this.width
      }),
      (t.prototype.displayWidth = function () {
        return this.width + 'pt'
      }),
      (t.prototype.setWidth = function (t) {
        null != t && (this.width = t)
      }),
      (t.prototype.getValueFromOptionsOrDefault = function (t) {
        return null == this[t] ? this.defaultOptions[t] : this[t]
      }),
      (t.prototype.getPrintElementOptionEntity = function () {
        var t = new i(),
          e = this
        return (
          Object.keys(this)
            .filter(function (t) {
              return 'topInDesign' != t
            })
            .forEach(function (n) {
              if (
                (('number' != typeof e[n] &&
                  'string' != typeof e[n] &&
                  _typeof(e[n]) != _typeof(!0)) ||
                  (t[n] = e[n]),
                'style' == n)
              ) {
                t.style = {}
                var i = e[n]
                if (i)
                  Object.keys(i).forEach(function (e) {
                    ;('number' != typeof i[e] && 'string' != typeof i[e]) || (t.style[e] = i[e])
                  })
              }
            }),
          t
        )
      }),
      (t.prototype.init = function (t) {
        var e = this
        t &&
          Object.keys(t).forEach(function (n) {
            e[n] = t[n]
          })
      }),
      t
    )
  })()
}
