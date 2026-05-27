// browserify module 51
// deps: {
//   117: 117,
//   118: 118,
//   124: 124,
//   37: 37,
//   62: 62,
//   64: 64,
//   68: 68,
//   70: 70,
//   75: 75,
//   81: 81,
//   86: 86,
//   94: 94
// }
export default function (t, n, r) {
  'use strict'

  var d = t(70),
    x = t(62),
    m = t(118),
    b = t(117),
    S = t(94),
    w = t(68),
    _ = t(37),
    E = t(81),
    F = t(64),
    I = t(86),
    O = t(124),
    P = t(75)
  n.exports = function (e, t, n, r, i, o) {
    var u = d[e],
      c = u,
      a = i ? 'set' : 'add',
      f = c && c.prototype,
      s = {},
      l = function (t) {
        var r = f[t]
        m(
          f,
          t,
          'delete' == t
            ? function (t) {
                return !(o && !E(t)) && r.call(this, 0 === t ? 0 : t)
              }
            : 'has' == t
              ? function has(t) {
                  return !(o && !E(t)) && r.call(this, 0 === t ? 0 : t)
                }
              : 'get' == t
                ? function get(t) {
                    return o && !E(t) ? void 0 : r.call(this, 0 === t ? 0 : t)
                  }
                : 'add' == t
                  ? function add(t) {
                      return (r.call(this, 0 === t ? 0 : t), this)
                    }
                  : function set(t, n) {
                      return (r.call(this, 0 === t ? 0 : t, n), this)
                    },
        )
      }
    if (
      'function' == typeof c &&
      (o ||
        (f.forEach &&
          !F(function () {
            new c().entries().next()
          })))
    ) {
      var h = new c(),
        p = h[a](o ? {} : -0, 1) != h,
        v = F(function () {
          h.has(1)
        }),
        y = I(function (t) {
          new c(t)
        }),
        g =
          !o &&
          F(function () {
            for (var t = new c(), n = 5; n--; ) t[a](n, n)
            return !t.has(-0)
          })
      ;(y ||
        (((c = t(function (t, n) {
          _(t, c, e)
          var r = P(new u(), t, c)
          return (null != n && w(n, i, r[a], r), r)
        })).prototype = f).constructor = c),
        (v || g) && (l('delete'), l('has'), i && l('get')),
        (g || p) && l(a),
        o && f.clear && delete f.clear)
    } else ((c = r.getConstructor(t, e, i, a)), b(c.prototype, n), (S.NEED = !0))
    return (O(c, e), (s[e] = c), x(x.G + x.W + x.F * (c != u), s), o || r.setStrong(c, e, i), c)
  }
}
