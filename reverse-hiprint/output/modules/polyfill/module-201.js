// browserify module 201
// deps: {
//   101: 101,
//   103: 103,
//   118: 118,
//   134: 134,
//   143: 143,
//   48: 48,
//   58: 58,
//   64: 64,
//   70: 70,
//   71: 71,
//   75: 75,
//   98: 98,
//   99: 99
// }
export default function (t, n, r) {
  'use strict'

  var e = t(70),
    i = t(71),
    o = t(48),
    u = t(75),
    s = t(143),
    c = t(64),
    a = t(103).f,
    f = t(101).f,
    l = t(99).f,
    h = t(134).trim,
    p = 'Number',
    v = e[p],
    y = v,
    g = v.prototype,
    d = o(t(98)(g)) == p,
    x = 'trim' in String.prototype,
    m = function (t) {
      var n = s(t, !1)
      if ('string' == typeof n && 2 < n.length) {
        var r,
          e,
          i,
          o = (n = x ? n.trim() : h(n, 3)).charCodeAt(0)
        if (43 === o || 45 === o) {
          if (88 === (r = n.charCodeAt(2)) || 120 === r) return NaN
        } else if (48 === o) {
          switch (n.charCodeAt(1)) {
            case 66:
            case 98:
              ;((e = 2), (i = 49))
              break
            case 79:
            case 111:
              ;((e = 8), (i = 55))
              break
            default:
              return +n
          }
          for (var u, c = n.slice(2), a = 0, f = c.length; a < f; a++)
            if ((u = c.charCodeAt(a)) < 48 || i < u) return NaN
          return parseInt(c, e)
        }
      }
      return +n
    }
  if (!v(' 0o1') || !v('0b1') || v('+0x1')) {
    v = function Number(t) {
      var n = arguments.length < 1 ? 0 : t,
        r = this
      return r instanceof v &&
        (d
          ? c(function () {
              g.valueOf.call(r)
            })
          : o(r) != p)
        ? u(new y(m(n)), r, v)
        : m(n)
    }
    for (
      var b,
        S = t(58)
          ? a(y)
          : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'.split(
              ',',
            ),
        w = 0;
      S.length > w;
      w++
    )
      i(y, (b = S[w])) && !i(v, b) && l(v, b, f(y, b))
    ;(((v.prototype = g).constructor = v), t(118)(e, p, v))
  }
}
