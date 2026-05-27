// browserify module 53
// deps: {
//   116: 116,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  var e = t(99),
    i = t(116)
  n.exports = function (t, n, r) {
    n in t ? e.f(t, n, i(0, r)) : (t[n] = r)
  }
}
