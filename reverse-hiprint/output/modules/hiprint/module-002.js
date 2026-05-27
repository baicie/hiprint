// webpack module 2
export default function (t, e, n) {
  'use strict'

  var i = (function () {
    function t(t) {
      this.printElement = t
    }
    return (
      (t.prototype.updatePosition = function (t, e) {
        ;((this.left = t), (this.top = e))
      }),
      t
    )
  })()
  n.d(e, 'a', function () {
    return o
  })
  var o = (function () {
    function t() {
      ;((this.printTemplateContainer = {}),
        (this.A1 = {
          width: 841,
          height: 594,
        }),
        (this.A2 = {
          width: 420,
          height: 594,
        }),
        (this.A3 = {
          width: 420,
          height: 297,
        }),
        (this.A4 = {
          width: 210,
          height: 297,
        }),
        (this.A5 = {
          width: 210,
          height: 148,
        }),
        (this.A6 = {
          width: 105,
          height: 148,
        }),
        (this.A7 = {
          width: 105,
          height: 74,
        }),
        (this.A8 = {
          width: 52,
          height: 74,
        }),
        (this.B1 = {
          width: 1e3,
          height: 707,
        }),
        (this.B2 = {
          width: 500,
          height: 707,
        }),
        (this.B3 = {
          width: 500,
          height: 353,
        }),
        (this.B4 = {
          width: 250,
          height: 353,
        }),
        (this.B5 = {
          width: 250,
          height: 176,
        }),
        (this.B6 = {
          width: 125,
          height: 176,
        }),
        (this.B7 = {
          width: 125,
          height: 88,
        }),
        (this.B8 = {
          width: 62,
          height: 88,
        }),
        (this.dragLengthCNum = function (t, e) {
          var n = 0.75 * t
          return (e && (e = e), Math.round(n / e) * e)
        }))
    }
    return (
      Object.defineProperty(t, 'instance', {
        get: function get() {
          return (this._instance || (this._instance = new t()), this._instance)
        },
        enumerable: !0,
        configurable: !0,
      }),
      (t.prototype.getDragingPrintElement = function () {
        return t.instance.dragingPrintElement
      }),
      (t.prototype.setDragingPrintElement = function (e) {
        t.instance.dragingPrintElement = new i(e)
      }),
      (t.prototype.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
          var e = (16 * Math.random()) | 0
          return ('x' == t ? e : (3 & e) | 8).toString(16)
        })
      }),
      (t.prototype.imageToBase64 = function (t) {
        if (-1 == $(t).attr('src').indexOf('base64'))
          try {
            var e = document.createElement('canvas'),
              n = new Image()
            ;((n.src = t.attr('src')),
              (e.width = n.width),
              (e.height = n.height),
              e.getContext('2d').drawImage(n, 0, 0),
              t.attr('src', e.toDataURL('image/png')))
          } catch (e) {
            try {
              this.xhrLoadImage(t)
            } catch (t) {
              console.log(t)
            }
          }
      }),
      (t.prototype.xhrLoadImage = function (t) {}),
      (t.prototype.transformImg = function (t) {
        var e = this
        t.map(function (t, n) {
          e.imageToBase64($(n))
        })
      }),
      (t.prototype.getPrintTemplateById = function (e) {
        return t.instance.printTemplateContainer[e]
      }),
      (t.prototype.setPrintTemplateById = function (e, n) {
        return (t.instance.printTemplateContainer[e] = n)
      }),
      t
    )
  })()
}
