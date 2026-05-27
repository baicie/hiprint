// browserify module 34
// deps: {
//   48: 48
// }
export default function (t, n, r) {
  var e = t(48)
  n.exports = function (t, n) {
    if ('number' != typeof t && 'Number' != e(t)) throw TypeError(n)
    return +t
  }
}
