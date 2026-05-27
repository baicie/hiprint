// webpack module 18
export default function (t, e, n) {
  'use strict'

  var i = n(3),
    o = n(12),
    r =
      ((function () {})(),
      (function () {
        return function (t) {
          ;((this.width = t.width),
            (this.title = t.title),
            (this.columnId = t.columnId),
            (this.fixed = !1),
            (this.rowspan = t.rowspan || 1),
            (this.colspan = t.colspan || 1),
            (this.align = t.align),
            (this.halign = t.halign),
            (this.vAlign = t.vAlign),
            (this.formatter2 = t.formatter2),
            (this.styler2 = t.styler2))
        }
      })()),
    a = n(5)
  n.d(e, 'a', function () {
    return l
  })
  var _p,
    s =
      ((_p = function p(t, e) {
        return (_p =
          Object.setPrototypeOf ||
          (_instanceof(
            {
              __proto__: [],
            },
            Array,
          ) &&
            function (t, e) {
              t.__proto__ = e
            }) ||
          function (t, e) {
            for (var n in e) {
              e.hasOwnProperty(n) && (t[n] = e[n])
            }
          })(t, e)
      }),
      function (t, e) {
        function n() {
          this.constructor = t
        }
        ;(_p(t, e),
          (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n())))
      }),
    l = (function (t) {
      function e(e, n) {
        var i = this
        ;((e = e || {}),
        ((i = t.call(this, e) || this).lHeight = e.lHeight),
        (i.autoCompletion = e.autoCompletion),
        (i.tableFooterRepeat = e.tableFooterRepeat),
        n) &&
          ((i.columns = []),
          n.editable && e.columns && e.columns.length
            ? e.columns.forEach(function (t) {
                var e = []
                ;(t.forEach(function (t) {
                  var i = new r(t),
                    o = n.getColumnByColumnId(i.columnId),
                    p = o ? $.extend(o, i) : new a.a(i)
                  ;((p.checked = !0), e.push(p))
                }),
                  i.columns.push(new o.a(e)))
              })
            : n.columns.forEach(function (t) {
                i.columns.push(
                  new o.a(
                    t.filter(function (t) {
                      return t.checked
                    }),
                  ),
                )
              }))
        return i
      }
      return (
        s(e, t),
        (e.prototype.getColumnByColumnId = function (t) {
          return this.makeColumnObj()[t]
        }),
        (e.prototype.makeColumnObj = function () {
          var t = {}
          return (
            this.columns &&
              this.columns.forEach(function (e) {
                e.columns.forEach(function (e) {
                  e.columnId && (t[e.columnId] = e)
                })
              }),
            t
          )
        }),
        (e.prototype.getGridColumns = function () {
          return this.gridColumns || 1
        }),
        (e.prototype.getPrintElementOptionEntity = function () {
          var e = t.prototype.getPrintElementOptionEntity.call(this)
          return (
            this.columns &&
              ((e.columns = []),
              this.columns.forEach(function (t) {
                var n = t
                  .getPrintElementOptionEntity()
                  .filter(function (t) {
                    return t.checked
                  })
                  .map(function (t) {
                    return new r(t)
                  })
                e.columns.push(n)
              })),
            e
          )
        }),
        e
      )
    })(i.a)
}
