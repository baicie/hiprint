// browserify module 115
// deps: {
//   38: 38,
//   81: 81,
//   96: 96
// }
export default function (t, n, r) {
  var e = t(38),
    i = t(81),
    o = t(96)
  n.exports = function (t, n) {
    if ((e(t), i(n) && n.constructor === t)) return n
    var r = o.f(t)
    return ((0, r.resolve)(n), r.promise)
  }
}
