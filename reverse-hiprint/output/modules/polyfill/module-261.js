// browserify module 261
// deps: {
//   130: 130,
//   141: 141,
//   62: 62,
//   63: 63
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    u = t(141),
    c = t(130),
    a = 'endsWith',
    f = ''[a]
  e(e.P + e.F * t(63)(a), 'String', {
    endsWith: function endsWith(t) {
      var n = c(this, t, a),
        r = 1 < arguments.length ? arguments[1] : void 0,
        e = u(n.length),
        i = void 0 === r ? e : Math.min(u(r), e),
        o = String(t)
      return f ? f.call(n, o, i) : n.slice(i - o.length, i) === o
    },
  })
}
