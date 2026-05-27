// browserify module 251
// deps: {
//   119: 119,
//   139: 139,
//   141: 141,
//   142: 142,
//   36: 36,
//   38: 38,
//   65: 65
// }
export default function (t, n, r) {
  'use strict'

  var _ = t(38),
    e = t(142),
    E = t(141),
    F = t(139),
    I = t(36),
    O = t(119),
    P = Math.max,
    A = Math.min,
    h = Math.floor,
    p = /\$([$&`']|\d\d?|<[^>]*>)/g,
    v = /\$([$&`']|\d\d?)/g
  t(65)('replace', 2, function (i, o, S, w) {
    return [
      function replace(t, n) {
        var r = i(this),
          e = null == t ? void 0 : t[o]
        return void 0 !== e ? e.call(t, r, n) : S.call(String(r), t, n)
      },
      function (t, n) {
        var r = w(S, t, this, n)
        if (r.done) return r.value
        var e = _(t),
          i = String(this),
          o = 'function' == typeof n
        o || (n = String(n))
        var u = e.global
        if (u) {
          var c = e.unicode
          e.lastIndex = 0
        }
        for (var a = []; ; ) {
          var f = O(e, i)
          if (null === f) break
          if ((a.push(f), !u)) break
          '' === String(f[0]) && (e.lastIndex = I(i, E(e.lastIndex), c))
        }
        for (var s, l = '', h = 0, p = 0; p < a.length; p++) {
          f = a[p]
          for (
            var v = String(f[0]), y = P(A(F(f.index), i.length), 0), g = [], d = 1;
            d < f.length;
            d++
          )
            g.push(void 0 === (s = f[d]) ? s : String(s))
          var x = f.groups
          if (o) {
            var m = [v].concat(g, y, i)
            void 0 !== x && m.push(x)
            var b = String(n.apply(void 0, m))
          } else b = getSubstitution(v, i, y, g, x, n)
          h <= y && ((l += i.slice(h, y) + b), (h = y + v.length))
        }
        return l + i.slice(h)
      },
    ]
    function getSubstitution(o, u, c, a, f, t) {
      var s = c + o.length,
        l = a.length,
        n = v
      return (
        void 0 !== f && ((f = e(f)), (n = p)),
        S.call(t, n, function (t, n) {
          var r
          switch (n.charAt(0)) {
            case '$':
              return '$'
            case '&':
              return o
            case '`':
              return u.slice(0, c)
            case "'":
              return u.slice(s)
            case '<':
              r = f[n.slice(1, -1)]
              break
            default:
              var e = +n
              if (0 === e) return t
              if (l < e) {
                var i = h(e / 10)
                return 0 === i
                  ? t
                  : i <= l
                    ? void 0 === a[i - 1]
                      ? n.charAt(1)
                      : a[i - 1] + n.charAt(1)
                    : t
              }
              r = a[e - 1]
          }
          return void 0 === r ? '' : r
        })
      )
    }
  })
}
