// browserify module 211
// deps: {
//   133: 133,
//   139: 139,
//   34: 34,
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    f = t(139),
    s = t(34),
    l = t(133),
    i = (1).toFixed,
    o = Math.floor,
    u = [0, 0, 0, 0, 0, 0],
    h = 'Number.toFixed: incorrect invocation!',
    p = function (t, n) {
      for (var r = -1, e = n; ++r < 6; ) ((e += t * u[r]), (u[r] = e % 1e7), (e = o(e / 1e7)))
    },
    v = function (t) {
      for (var n = 6, r = 0; 0 <= --n; ) ((r += u[n]), (u[n] = o(r / t)), (r = (r % t) * 1e7))
    },
    y = function () {
      for (var t = 6, n = ''; 0 <= --t; )
        if ('' !== n || 0 === t || 0 !== u[t]) {
          var r = String(u[t])
          n = '' === n ? r : n + l.call('0', 7 - r.length) + r
        }
      return n
    },
    g = function (t, n, r) {
      return 0 === n ? r : n % 2 == 1 ? g(t, n - 1, r * t) : g(t * t, n / 2, r)
    }
  e(
    e.P +
      e.F *
        ((!!i &&
          ('0.000' !== (8e-5).toFixed(3) ||
            '1' !== (0.9).toFixed(0) ||
            '1.25' !== (1.255).toFixed(2) ||
            '1000000000000000128' !== (0xde0b6b3a7640080).toFixed(0))) ||
          !t(64)(function () {
            i.call({})
          })),
    'Number',
    {
      toFixed: function toFixed(t) {
        var n,
          r,
          e,
          i,
          o = s(this, h),
          u = f(t),
          c = '',
          a = '0'
        if (u < 0 || 20 < u) throw RangeError(h)
        if (o != o) return 'NaN'
        if (o <= -1e21 || 1e21 <= o) return String(o)
        if ((o < 0 && ((c = '-'), (o = -o)), 1e-21 < o))
          if (
            ((r =
              (n =
                (function (t) {
                  for (var n = 0, r = t; 4096 <= r; ) ((n += 12), (r /= 4096))
                  for (; 2 <= r; ) ((n += 1), (r /= 2))
                  return n
                })(o * g(2, 69, 1)) - 69) < 0
                ? o * g(2, -n, 1)
                : o / g(2, n, 1)),
            (r *= 4503599627370496),
            0 < (n = 52 - n))
          ) {
            for (p(0, r), e = u; 7 <= e; ) (p(1e7, 0), (e -= 7))
            for (p(g(10, e, 1), 0), e = n - 1; 23 <= e; ) (v(1 << 23), (e -= 23))
            ;(v(1 << e), p(1, 1), v(2), (a = y()))
          } else (p(0, r), p(1 << -n, 0), (a = y() + l.call('0', u)))
        return (a =
          0 < u
            ? c +
              ((i = a.length) <= u
                ? '0.' + l.call('0', u - i) + a
                : a.slice(0, i - u) + '.' + a.slice(i - u))
            : c + a)
      },
    },
  )
}
