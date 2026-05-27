// browserify module 100
// deps: {
//   107: 107,
//   38: 38,
//   58: 58,
//   99: 99
// }
export default function (t, n, r) {
  var u = t(99),
    c = t(38),
    a = t(107)
  n.exports = t(58)
    ? Object.defineProperties
    : function defineProperties(t, n) {
        c(t)
        for (var r, e = a(n), i = e.length, o = 0; o < i; ) u.f(t, (r = e[o++]), n[r])
        return t
      }
}
