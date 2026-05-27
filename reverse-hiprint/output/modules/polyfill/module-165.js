// browserify module 165
// deps: {
//   128: 128,
//   140: 140,
//   62: 62,
//   77: 77
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(140),
    o = [].join
  e(e.P + e.F * (t(77) != Object || !t(128)(o)), 'Array', {
    join: function join(t) {
      return o.call(i(this), void 0 === t ? ',' : t)
    },
  })
}
