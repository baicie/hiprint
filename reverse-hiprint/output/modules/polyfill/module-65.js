// browserify module 65
// deps: {
//   118: 118,
//   120: 120,
//   152: 152,
//   248: 248,
//   57: 57,
//   64: 64,
//   72: 72
// }
export default function (t, n, r) {
  'use strict'

  t(248)
  var s = t(118),
    l = t(72),
    h = t(64),
    p = t(57),
    v = t(152),
    y = t(120),
    g = v('species'),
    d = !h(function () {
      var t = /./
      return (
        (t.exec = function () {
          var t = []
          return (
            (t.groups = {
              a: '7',
            }),
            t
          )
        }),
        '7' !== ''.replace(t, '$<a>')
      )
    }),
    x = (function () {
      var t = /(?:)/,
        n = t.exec
      t.exec = function () {
        return n.apply(this, arguments)
      }
      var r = 'ab'.split(t)
      return 2 === r.length && 'a' === r[0] && 'b' === r[1]
    })()
  n.exports = function (r, t, n) {
    var e = v(r),
      o = !h(function () {
        var t = {}
        return (
          (t[e] = function () {
            return 7
          }),
          7 != ''[r](t)
        )
      }),
      i = o
        ? !h(function () {
            var t = !1,
              n = /a/
            return (
              (n.exec = function () {
                return ((t = !0), null)
              }),
              'split' === r &&
                ((n.constructor = {}),
                (n.constructor[g] = function () {
                  return n
                })),
              n[e](''),
              !t
            )
          })
        : void 0
    if (!o || !i || ('replace' === r && !d) || ('split' === r && !x)) {
      var u = /./[e],
        c = n(p, e, ''[r], function maybeCallNative(t, n, r, e, i) {
          return n.exec === y
            ? o && !i
              ? {
                  done: !0,
                  value: u.call(n, r, e),
                }
              : {
                  done: !0,
                  value: t.call(r, n, e),
                }
            : {
                done: !1,
              }
        }),
        a = c[0],
        f = c[1]
      ;(s(String.prototype, r, a),
        l(
          RegExp.prototype,
          e,
          2 == t
            ? function (t, n) {
                return f.call(t, this, n)
              }
            : function (t) {
                return f.call(t, this)
              },
        ))
    }
  }
}
