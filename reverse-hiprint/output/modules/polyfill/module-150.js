// browserify module 150
// deps: {
//   151: 151,
//   52: 52,
//   70: 70,
//   89: 89,
//   99: 99
// }
export default function (t, n, r) {
  var e = t(70),
    i = t(52),
    o = t(89),
    u = t(151),
    c = t(99).f
  n.exports = function (t) {
    var n = i.Symbol || (i.Symbol = o ? {} : e.Symbol || {})
    '_' == t.charAt(0) ||
      t in n ||
      c(n, t, {
        value: u.f(t),
      })
  }
}
