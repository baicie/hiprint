// browserify module 22
// deps: {
//   18: 18,
//   19: 19,
//   24: 24,
//   25: 25,
//   26: 26
// }
export default function (t, n, r) {
  var y = t(24),
    g = t(18),
    d = t(19),
    x = t(26),
    m = t(25),
    b = 'prototype',
    S = function (t, n, r) {
      var e,
        i,
        o,
        u = t & S.F,
        c = t & S.G,
        a = t & S.S,
        f = t & S.P,
        s = t & S.B,
        l = t & S.W,
        h = c ? g : g[n] || (g[n] = {}),
        p = h[b],
        v = c ? y : a ? y[n] : (y[n] || {})[b]
      for (e in (c && (r = n), r))
        ((i = !u && v && void 0 !== v[e]) && m(h, e)) ||
          ((o = i ? v[e] : r[e]),
          (h[e] =
            c && 'function' != typeof v[e]
              ? r[e]
              : s && i
                ? d(o, y)
                : l && v[e] == o
                  ? (function (e) {
                      var t = function (t, n, r) {
                        if (this instanceof e) {
                          switch (arguments.length) {
                            case 0:
                              return new e()
                            case 1:
                              return new e(t)
                            case 2:
                              return new e(t, n)
                          }
                          return new e(t, n, r)
                        }
                        return e.apply(this, arguments)
                      }
                      return ((t[b] = e[b]), t)
                    })(o)
                  : f && 'function' == typeof o
                    ? d(Function.call, o)
                    : o),
          f && (((h.virtual || (h.virtual = {}))[e] = o), t & S.R && p && !p[e] && x(p, e, o)))
    }
  ;((S.F = 1),
    (S.G = 2),
    (S.S = 4),
    (S.P = 8),
    (S.B = 16),
    (S.W = 32),
    (S.U = 64),
    (S.R = 128),
    (n.exports = S))
}
