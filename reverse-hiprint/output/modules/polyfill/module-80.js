// browserify module 80
// deps: {
//   81: 81
// }
export default function (t, n, r) {
  var e = t(81),
    i = Math.floor
  n.exports = function isInteger(t) {
    return !e(t) && isFinite(t) && i(t) === t
  }
}
