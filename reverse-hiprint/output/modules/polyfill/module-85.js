// browserify module 85
// deps: {
//   105: 105,
//   118: 118,
//   124: 124,
//   152: 152,
//   62: 62,
//   72: 72,
//   84: 84,
//   88: 88,
//   89: 89
// }
export default function (t, n, r) {
  'use strict'

  var m = t(89),
    b = t(62),
    S = t(118),
    w = t(72),
    _ = t(88),
    E = t(84),
    F = t(124),
    I = t(105),
    O = t(152)('iterator'),
    P = !([].keys && 'next' in [].keys()),
    A = 'values',
    M = function () {
      return this
    }
  n.exports = function (t, n, r, e, i, o, u) {
    E(r, n, e)
    var c,
      a,
      f,
      s = function (t) {
        if (!P && t in v) return v[t]
        switch (t) {
          case 'keys':
            return function keys() {
              return new r(this, t)
            }
          case A:
            return function values() {
              return new r(this, t)
            }
        }
        return function entries() {
          return new r(this, t)
        }
      },
      l = n + ' Iterator',
      h = i == A,
      p = !1,
      v = t.prototype,
      y = v[O] || v['@@iterator'] || (i && v[i]),
      g = y || s(i),
      d = i ? (h ? s('entries') : g) : void 0,
      x = ('Array' == n && v.entries) || y
    if (
      (x &&
        (f = I(x.call(new t()))) !== Object.prototype &&
        f.next &&
        (F(f, l, !0), m || 'function' == typeof f[O] || w(f, O, M)),
      h &&
        y &&
        y.name !== A &&
        ((p = !0),
        (g = function values() {
          return y.call(this)
        })),
      (m && !u) || (!P && !p && v[O]) || w(v, O, g),
      (_[n] = g),
      (_[l] = M),
      i)
    )
      if (
        ((c = {
          values: h ? g : s(A),
          keys: o ? g : s('keys'),
          entries: d,
        }),
        u)
      )
        for (a in c) a in v || S(v, a, c[a])
      else b(b.P + b.F * (P || p), n, c)
    return c
  }
}
