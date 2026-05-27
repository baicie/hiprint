// browserify module 181
// deps: {
//   105: 105,
//   152: 152,
//   81: 81,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  var e = t(81),
    i = t(105),
    o = t(152)('hasInstance'),
    u = Function.prototype
  o in u ||
    t(99).f(u, o, {
      value: function (t) {
        if ('function' != typeof this || !e(t)) return !1
        if (!e(this.prototype)) return t instanceof this
        for (; (t = i(t)); ) if (this.prototype === t) return !0
        return !1
      },
    })
}
