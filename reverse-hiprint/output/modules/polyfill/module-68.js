// browserify module 68
// deps: {
//   141: 141,
//   153: 153,
//   38: 38,
//   54: 54,
//   78: 78,
//   83: 83
// }
export default function (t, n, r) {
  var h = t(54),
    p = t(83),
    v = t(78),
    y = t(38),
    g = t(141),
    d = t(153),
    x = {},
    m = {}
  ;(((r = n.exports =
    function (t, n, r, e, i) {
      var o,
        u,
        c,
        a,
        f = i
          ? function () {
              return t
            }
          : d(t),
        s = h(r, e, n ? 2 : 1),
        l = 0
      if ('function' != typeof f) throw TypeError(t + ' is not iterable!')
      if (v(f)) {
        for (o = g(t.length); l < o; l++)
          if ((a = n ? s(y((u = t[l]))[0], u[1]) : s(t[l])) === x || a === m) return a
      } else
        for (c = f.call(t); !(u = c.next()).done; )
          if ((a = p(c, s, u.value, n)) === x || a === m) return a
    }).BREAK = x),
    (r.RETURN = m))
}
