// browserify module 83
// deps: {
//   38: 38
// }
export default function (t, n, r) {
  var o = t(38)
  n.exports = function (n, t, r, e) {
    try {
      return e ? t(o(r)[0], r[1]) : t(r)
    } catch (t) {
      var i = n.return
      throw (void 0 !== i && o(i.call(n)), t)
    }
  }
}
