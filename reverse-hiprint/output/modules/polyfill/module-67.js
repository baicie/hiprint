// browserify module 67
// deps: {
//   141: 141,
//   152: 152,
//   54: 54,
//   79: 79,
//   81: 81
// }
export default function (t, n, r) {
  'use strict'

  var p = t(79),
    v = t(81),
    y = t(141),
    g = t(54),
    d = t(152)('isConcatSpreadable')
  n.exports = function flattenIntoArray(t, n, r, e, i, o, u, c) {
    for (var a, f, s = i, l = 0, h = !!u && g(u, c, 3); l < e; ) {
      if (l in r) {
        if (
          ((a = h ? h(r[l], l, n) : r[l]),
          (f = !1),
          v(a) && (f = void 0 !== (f = a[d]) ? !!f : p(a)),
          f && 0 < o)
        )
          s = flattenIntoArray(t, n, a, y(a.length), s, o - 1) - 1
        else {
          if (9007199254740991 <= s) throw TypeError()
          t[s] = a
        }
        s++
      }
      l++
    }
    return s
  }
}
