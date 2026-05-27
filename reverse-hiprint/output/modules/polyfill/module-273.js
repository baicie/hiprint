// browserify module 273
// deps: {
//   130: 130,
//   141: 141,
//   62: 62,
//   63: 63
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(141),
    o = t(130),
    u = 'startsWith',
    c = ''[u]
  e(e.P + e.F * t(63)(u), 'String', {
    startsWith: function startsWith(t) {
      var n = o(this, t, u),
        r = i(Math.min(1 < arguments.length ? arguments[1] : void 0, n.length)),
        e = String(t)
      return c ? c.call(n, e, r) : n.slice(r, r + e.length) === e
    },
  })
}
