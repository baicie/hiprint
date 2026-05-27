// browserify module 149
// deps: {
//   81: 81
// }
export default function (t, n, r) {
  var e = t(81)
  n.exports = function (t, n) {
    if (!e(t) || t._t !== n) throw TypeError('Incompatible receiver, ' + n + ' required!')
    return t
  }
}
