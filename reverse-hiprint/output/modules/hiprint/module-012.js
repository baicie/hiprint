// webpack module 12
export default function (t, e, n) {
  'use strict'

  n.d(e, 'a', function () {
    return p
  })
  var _i,
    o = n(5),
    r = n(13),
    a =
      ((_i = function i(t, e) {
        return (_i =
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
        ;(_i(t, e),
          (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n())))
      }),
    p = (function (t) {
      function e(e) {
        var n = t.call(this) || this
        ;((n.columns = []), e && e.constructor === Array)
          ? (e || []).forEach(function (t) {
              n.columns.push(new o.a(t))
            })
          : e.columns &&
            (e.columns || []).forEach(function (t) {
              n.columns.push(new o.a(t))
            })
        return n
      }
      return (
        a(e, t),
        (e.prototype.getPrintElementOptionEntity = function () {
          var t = []
          return (
            this.columns.forEach(function (e) {
              t.push(e.getEntity())
            }),
            t
          )
        }),
        e
      )
    })(r.a)
}
