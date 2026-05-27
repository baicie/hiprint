// browserify module 134
// deps: {
//   135: 135,
//   57: 57,
//   62: 62,
//   64: 64
// }
export default function (t, n, r) {
  var u = t(62),
    e = t(57),
    c = t(64),
    a = t(135),
    i = '[' + a + ']',
    o = RegExp('^' + i + i + '*'),
    f = RegExp(i + i + '*$'),
    s = function (t, n, r) {
      var e = {},
        i = c(function () {
          return !!a[t]() || '​' != '​'[t]()
        }),
        o = (e[t] = i ? n(l) : a[t])
      ;(r && (e[r] = o), u(u.P + u.F * i, 'String', e))
    },
    l = (s.trim = function (t, n) {
      return (
        (t = String(e(t))),
        1 & n && (t = t.replace(o, '')),
        2 & n && (t = t.replace(f, '')),
        t
      )
    })
  n.exports = s
}
