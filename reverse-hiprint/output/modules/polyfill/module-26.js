// browserify module 26
// deps: {
//   20: 20,
//   29: 29,
//   30: 30
// }
export default function (t, n, r) {
  var e = t(29),
    i = t(30)
  n.exports = t(20)
    ? function (t, n, r) {
        return e.f(t, n, i(1, r))
      }
    : function (t, n, r) {
        return ((t[n] = r), t)
      }
}
