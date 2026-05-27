// browserify module 42
// deps: {
//   141: 141,
//   142: 142,
//   45: 45,
//   54: 54,
//   77: 77
// }
export default function (t, n, r) {
  var m = t(54),
    b = t(77),
    S = t(142),
    w = t(141),
    e = t(45)
  n.exports = function (l, t) {
    var h = 1 == l,
      p = 2 == l,
      v = 3 == l,
      y = 4 == l,
      g = 6 == l,
      d = 5 == l || g,
      x = t || e
    return function (t, n, r) {
      for (
        var e,
          i,
          o = S(t),
          u = b(o),
          c = m(n, r, 3),
          a = w(u.length),
          f = 0,
          s = h ? x(t, a) : p ? x(t, 0) : void 0;
        f < a;
        f++
      )
        if ((d || f in u) && ((i = c((e = u[f]), f, o)), l))
          if (h) s[f] = i
          else if (i)
            switch (l) {
              case 3:
                return !0
              case 5:
                return e
              case 6:
                return f
              case 2:
                s.push(e)
            }
          else if (y) return !1
      return g ? -1 : v || y ? y : s
    }
  }
}
