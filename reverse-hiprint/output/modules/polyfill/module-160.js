// browserify module 160
// deps: {
//   128: 128,
//   42: 42,
//   62: 62
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(42)(0),
    o = t(128)([].forEach, !0)
  e(e.P + e.F * !o, 'Array', {
    forEach: function forEach(t) {
      return i(this, t, arguments[1])
    },
  })
}
