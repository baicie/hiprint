// browserify module 171
// deps: {
//   137: 137,
//   141: 141,
//   48: 48,
//   62: 62,
//   64: 64,
//   73: 73
// }
export default function (t, n, r) {
  'use strict'

  var e = t(62),
    i = t(73),
    f = t(48),
    s = t(137),
    l = t(141),
    h = [].slice
  e(
    e.P +
      e.F *
        t(64)(function () {
          i && h.call(i)
        }),
    'Array',
    {
      slice: function slice(t, n) {
        var r = l(this.length),
          e = f(this)
        if (((n = void 0 === n ? r : n), 'Array' == e)) return h.call(this, t, n)
        for (var i = s(t, r), o = s(n, r), u = l(o - i), c = new Array(u), a = 0; a < u; a++)
          c[a] = 'String' == e ? this.charAt(i + a) : this[i + a]
        return c
      },
    },
  )
}
