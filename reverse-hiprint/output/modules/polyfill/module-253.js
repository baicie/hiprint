// browserify module 253
// deps: {
//   119: 119,
//   120: 120,
//   127: 127,
//   141: 141,
//   36: 36,
//   38: 38,
//   64: 64,
//   65: 65,
//   82: 82
// }
export default function (t, n, r) {
  'use strict'

  var l = t(82),
    m = t(38),
    b = t(127),
    S = t(36),
    w = t(141),
    _ = t(119),
    h = t(120),
    e = t(64),
    E = Math.min,
    p = [].push,
    u = 'split',
    v = 'length',
    y = 'lastIndex',
    F = 4294967295,
    I = !e(function () {
      RegExp(F, 'y')
    })
  t(65)('split', 2, function (i, o, g, d) {
    var x
    return (
      (x =
        'c' == 'abbc'[u](/(b)*/)[1] ||
        4 != 'test'[u](/(?:)/, -1)[v] ||
        2 != 'ab'[u](/(?:ab)*/)[v] ||
        4 != '.'[u](/(.?)(.?)/)[v] ||
        1 < '.'[u](/()()/)[v] ||
        ''[u](/.?/)[v]
          ? function (t, n) {
              var r = String(this)
              if (void 0 === t && 0 === n) return []
              if (!l(t)) return g.call(r, t, n)
              for (
                var e,
                  i,
                  o,
                  u = [],
                  c =
                    (t.ignoreCase ? 'i' : '') +
                    (t.multiline ? 'm' : '') +
                    (t.unicode ? 'u' : '') +
                    (t.sticky ? 'y' : ''),
                  a = 0,
                  f = void 0 === n ? F : n >>> 0,
                  s = new RegExp(t.source, c + 'g');
                (e = h.call(s, r)) &&
                !(
                  a < (i = s[y]) &&
                  (u.push(r.slice(a, e.index)),
                  1 < e[v] && e.index < r[v] && p.apply(u, e.slice(1)),
                  (o = e[0][v]),
                  (a = i),
                  u[v] >= f)
                );
              )
                s[y] === e.index && s[y]++
              return (
                a === r[v] ? (!o && s.test('')) || u.push('') : u.push(r.slice(a)),
                u[v] > f ? u.slice(0, f) : u
              )
            }
          : '0'[u](void 0, 0)[v]
            ? function (t, n) {
                return void 0 === t && 0 === n ? [] : g.call(this, t, n)
              }
            : g),
      [
        function split(t, n) {
          var r = i(this),
            e = null == t ? void 0 : t[o]
          return void 0 !== e ? e.call(t, r, n) : x.call(String(r), t, n)
        },
        function (t, n) {
          var r = d(x, t, this, n, x !== g)
          if (r.done) return r.value
          var e = m(t),
            i = String(this),
            o = b(e, RegExp),
            u = e.unicode,
            c =
              (e.ignoreCase ? 'i' : '') +
              (e.multiline ? 'm' : '') +
              (e.unicode ? 'u' : '') +
              (I ? 'y' : 'g'),
            a = new o(I ? e : '^(?:' + e.source + ')', c),
            f = void 0 === n ? F : n >>> 0
          if (0 === f) return []
          if (0 === i.length) return null === _(a, i) ? [i] : []
          for (var s = 0, l = 0, h = []; l < i.length; ) {
            a.lastIndex = I ? l : 0
            var p,
              v = _(a, I ? i : i.slice(l))
            if (null === v || (p = E(w(a.lastIndex + (I ? 0 : l)), i.length)) === s) l = S(i, l, u)
            else {
              if ((h.push(i.slice(s, l)), h.length === f)) return h
              for (var y = 1; y <= v.length - 1; y++) if ((h.push(v[y]), h.length === f)) return h
              l = s = p
            }
          }
          return (h.push(i.slice(s)), h)
        },
      ]
    )
  })
}
