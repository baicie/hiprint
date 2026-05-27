// browserify module 17
// deps: {
//   28: 28
// }
export default function (t, n, r) {
  var e = t(28)
  n.exports = function (t) {
    if (!e(t)) throw TypeError(t + ' is not an object!')
    return t
  }
}
