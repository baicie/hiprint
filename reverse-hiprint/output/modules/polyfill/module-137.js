// browserify module 137
// deps: {
//   139: 139
// }
export default function (t, n, r) {
  var e = t(139),
    i = Math.max,
    o = Math.min
  n.exports = function (t, n) {
    return (t = e(t)) < 0 ? i(t + n, 0) : o(t, n)
  }
}
