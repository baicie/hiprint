// browserify module 162
// deps: {
//   128: 128,
//   41: 41,
//   62: 62
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(41)(!1),
    o = [].indexOf,
    u = !!o && 1 / [1].indexOf(1, -0) < 0
  e(e.P + e.F * (u || !t(128)(o)), 'Array', {
    indexOf: function indexOf(t) {
      return u ? o.apply(this, arguments) || 0 : i(this, t, arguments[1])
    },
  })
}
