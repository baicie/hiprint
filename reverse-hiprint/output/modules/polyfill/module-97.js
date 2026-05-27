// browserify module 97
// deps: {
//   104: 104,
//   107: 107,
//   108: 108,
//   142: 142,
//   64: 64,
//   77: 77
// }
export default function (t, n, r) {
  'use strict'

  var h = t(107),
    p = t(104),
    v = t(108),
    y = t(142),
    g = t(77),
    i = Object.assign
  n.exports =
    !i ||
    t(64)(function () {
      var t = {},
        n = {},
        r = Symbol(),
        e = 'abcdefghijklmnopqrst'
      return (
        (t[r] = 7),
        e.split('').forEach(function (t) {
          n[t] = t
        }),
        7 != i({}, t)[r] || Object.keys(i({}, n)).join('') != e
      )
    })
      ? function assign(t, n) {
          for (var r = y(t), e = arguments.length, i = 1, o = p.f, u = v.f; i < e; )
            for (
              var c, a = g(arguments[i++]), f = o ? h(a).concat(o(a)) : h(a), s = f.length, l = 0;
              l < s;
            )
              u.call(a, (c = f[l++])) && (r[c] = a[c])
          return r
        }
      : i
}
