// browserify module 247
// deps: {
//   103: 103,
//   118: 118,
//   123: 123,
//   152: 152,
//   58: 58,
//   64: 64,
//   66: 66,
//   70: 70,
//   75: 75,
//   82: 82,
//   99: 99
// }
export default function (t, n, r) {
  var e = t(70),
    o = t(75),
    i = t(99).f,
    u = t(103).f,
    c = t(82),
    a = t(66),
    f = e.RegExp,
    s = f,
    l = f.prototype,
    h = /a/g,
    p = /a/g,
    v = new f(h) !== h
  if (
    t(58) &&
    (!v ||
      t(64)(function () {
        return ((p[t(152)('match')] = !1), f(h) != h || f(p) == p || '/a/i' != f(h, 'i'))
      }))
  ) {
    f = function RegExp(t, n) {
      var r = this instanceof f,
        e = c(t),
        i = void 0 === n
      return !r && e && t.constructor === f && i
        ? t
        : o(
            v
              ? new s(e && !i ? t.source : t, n)
              : s((e = t instanceof f) ? t.source : t, e && i ? a.call(t) : n),
            r ? this : l,
            f,
          )
    }
    for (
      var y = function (n) {
          ;(n in f) ||
            i(f, n, {
              configurable: !0,
              get: function () {
                return s[n]
              },
              set: function (t) {
                s[n] = t
              },
            })
        },
        g = u(s),
        d = 0;
      g.length > d;
    )
      y(g[d++])
    ;(((l.constructor = f).prototype = l), t(118)(e, 'RegExp', f))
  }
  t(123)('RegExp')
}
