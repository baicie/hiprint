// browserify module 39
// deps: {
//   137: 137,
//   141: 141,
//   142: 142
// }
export default function (t, n, r) {
  'use strict'

  var f = t(142),
    s = t(137),
    l = t(141)
  n.exports =
    [].copyWithin ||
    function copyWithin(t, n) {
      var r = f(this),
        e = l(r.length),
        i = s(t, e),
        o = s(n, e),
        u = 2 < arguments.length ? arguments[2] : void 0,
        c = Math.min((void 0 === u ? e : s(u, e)) - o, e - i),
        a = 1
      for (o < i && i < o + c && ((a = -1), (o += c - 1), (i += c - 1)); 0 < c--; )
        (o in r ? (r[i] = r[o]) : delete r[i], (i += a), (o += a))
      return r
    }
}
