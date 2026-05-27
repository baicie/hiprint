// browserify module 292
// deps: {
//   141: 141,
//   142: 142,
//   33: 33,
//   35: 35,
//   45: 45,
//   62: 62,
//   67: 67
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(67),
    o = t(142),
    u = t(141),
    c = t(33),
    a = t(45)
  ;(e(e.P, 'Array', {
    flatMap: function flatMap(t) {
      var n,
        r,
        e = o(this)
      return (c(t), (n = u(e.length)), (r = a(e, 0)), i(r, e, e, n, 0, 1, t, arguments[1]), r)
    },
  }),
    t(35)('flatMap'))
}
