// browserify module 21
// deps: {
//   24: 24,
//   28: 28
// }
export default function (t, n, r) {
  var e = t(28),
    i = t(24).document,
    o = e(i) && e(i.createElement)
  n.exports = function (t) {
    return o ? i.createElement(t) : {}
  }
}
