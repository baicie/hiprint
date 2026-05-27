// browserify module 161
// deps: {
//   141: 141,
//   142: 142,
//   153: 153,
//   53: 53,
//   54: 54,
//   62: 62,
//   78: 78,
//   83: 83,
//   86: 86
// }
export default function (t, n, r) {
  'use strict'

  var h = t(54),
    e = t(62),
    p = t(142),
    v = t(83),
    y = t(78),
    g = t(141),
    d = t(53),
    x = t(153)
  e(
    e.S +
      e.F *
        !t(86)(function (t) {
          Array.from(t)
        }),
    'Array',
    {
      from: function from(t) {
        var n,
          r,
          e,
          i,
          o = p(t),
          u = 'function' == typeof this ? this : Array,
          c = arguments.length,
          a = 1 < c ? arguments[1] : void 0,
          f = void 0 !== a,
          s = 0,
          l = x(o)
        if ((f && (a = h(a, 2 < c ? arguments[2] : void 0, 2)), null == l || (u == Array && y(l))))
          for (r = new u((n = g(o.length))); s < n; s++) d(r, s, f ? a(o[s], s) : o[s])
        else
          for (i = l.call(o), r = new u(); !(e = i.next()).done; s++)
            d(r, s, f ? v(i, a, [e.value, s], !0) : e.value)
        return ((r.length = s), r)
      },
    },
  )
}
