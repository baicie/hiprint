// browserify module 250
// deps: {
//   119: 119,
//   141: 141,
//   36: 36,
//   38: 38,
//   65: 65
// }
export default function (t, n, r) {
  'use strict'

  var l = t(38),
    h = t(141),
    p = t(36),
    v = t(119)
  t(65)('match', 1, function (e, i, f, s) {
    return [
      function match(t) {
        var n = e(this),
          r = null == t ? void 0 : t[i]
        return void 0 !== r ? r.call(t, n) : new RegExp(t)[i](String(n))
      },
      function (t) {
        var n = s(f, t, this)
        if (n.done) return n.value
        var r = l(t),
          e = String(this)
        if (!r.global) return v(r, e)
        for (var i, o = r.unicode, u = [], c = (r.lastIndex = 0); null !== (i = v(r, e)); ) {
          var a = String(i[0])
          ;('' === (u[c] = a) && (r.lastIndex = p(e, h(r.lastIndex), o)), c++)
        }
        return 0 === c ? null : u
      },
    ]
  })
}
