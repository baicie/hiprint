// browserify module 75
// deps: {
//   122: 122,
//   81: 81
// }
export default function (t, n, r) {
  var o = t(81),
    u = t(122).set
  n.exports = function (t, n, r) {
    var e,
      i = n.constructor
    return (
      i !== r &&
        'function' == typeof i &&
        (e = i.prototype) !== r.prototype &&
        o(e) &&
        u &&
        u(t, e),
      t
    )
  }
}
