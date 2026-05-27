// browserify module 130
// deps: {
//   57: 57,
//   82: 82
// }
export default function (t, n, r) {
  var e = t(82),
    i = t(57)
  n.exports = function (t, n, r) {
    if (e(n)) throw TypeError('String#' + r + " doesn't accept regex!")
    return String(i(t))
  }
}
