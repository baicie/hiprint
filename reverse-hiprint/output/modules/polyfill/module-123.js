// browserify module 123
// deps: {
//   152: 152,
//   58: 58,
//   70: 70,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  var e = t(70),
    i = t(99),
    o = t(58),
    u = t(152)('species')
  n.exports = function (t) {
    var n = e[t]
    o &&
      n &&
      !n[u] &&
      i.f(n, u, {
        configurable: !0,
        get: function () {
          return this
        },
      })
  }
}
