// browserify module 62
// deps: {
//   118: 118,
//   52: 52,
//   54: 54,
//   70: 70,
//   72: 72
// }
export default function (t, n, r) {
  var y = t(70),
    g = t(52),
    d = t(72),
    x = t(118),
    m = t(54),
    b = 'prototype',
    S = function (t, n, r) {
      var e,
        i,
        o,
        u,
        c = t & S.F,
        a = t & S.G,
        f = t & S.S,
        s = t & S.P,
        l = t & S.B,
        h = a ? y : f ? y[n] || (y[n] = {}) : (y[n] || {})[b],
        p = a ? g : g[n] || (g[n] = {}),
        v = p[b] || (p[b] = {})
      for (e in (a && (r = n), r))
        ((o = ((i = !c && h && void 0 !== h[e]) ? h : r)[e]),
          (u = l && i ? m(o, y) : s && 'function' == typeof o ? m(Function.call, o) : o),
          h && x(h, e, o, t & S.U),
          p[e] != o && d(p, e, u),
          s && v[e] != o && (v[e] = o))
    }
  ;((y.core = g),
    (S.F = 1),
    (S.G = 2),
    (S.S = 4),
    (S.P = 8),
    (S.B = 16),
    (S.W = 32),
    (S.U = 64),
    (S.R = 128),
    (n.exports = S))
}
