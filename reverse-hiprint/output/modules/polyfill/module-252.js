// browserify module 252
// deps: {
//   119: 119,
//   121: 121,
//   38: 38,
//   65: 65
// }
export default function (t, n, r) {
  'use strict'

  var a = t(38),
    f = t(121),
    s = t(119)
  t(65)('search', 1, function (e, i, u, c) {
    return [
      function search(t) {
        var n = e(this),
          r = null == t ? void 0 : t[i]
        return void 0 !== r ? r.call(t, n) : new RegExp(t)[i](String(n))
      },
      function (t) {
        var n = c(u, t, this)
        if (n.done) return n.value
        var r = a(t),
          e = String(this),
          i = r.lastIndex
        f(i, 0) || (r.lastIndex = 0)
        var o = s(r, e)
        return (f(r.lastIndex, i) || (r.lastIndex = i), null === o ? -1 : o.index)
      },
    ]
  })
}
