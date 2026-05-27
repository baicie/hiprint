// browserify module 158
// deps: {
//   35: 35,
//   42: 42,
//   62: 62
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(42)(6),
    o = 'findIndex',
    u = !0
  ;(o in [] &&
    Array(1)[o](function () {
      u = !1
    }),
    e(e.P + e.F * u, 'Array', {
      findIndex: function findIndex(t) {
        return i(this, t, 1 < arguments.length ? arguments[1] : void 0)
      },
    }),
    t(35)(o))
}
