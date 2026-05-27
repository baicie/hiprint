// browserify module 166
// deps: {
//   128: 128,
//   139: 139,
//   140: 140,
//   141: 141,
//   62: 62
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(140),
    o = t(139),
    u = t(141),
    c = [].lastIndexOf,
    a = !!c && 1 / [1].lastIndexOf(1, -0) < 0
  e(e.P + e.F * (a || !t(128)(c)), 'Array', {
    lastIndexOf: function lastIndexOf(t) {
      if (a) return c.apply(this, arguments) || 0
      var n = i(this),
        r = u(n.length),
        e = r - 1
      for (
        1 < arguments.length && (e = Math.min(e, o(arguments[1]))), e < 0 && (e = r + e);
        0 <= e;
        e--
      )
        if (e in n && n[e] === t) return e || 0
      return -1
    },
  })
}
