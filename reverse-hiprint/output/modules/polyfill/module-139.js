// browserify module 139
// deps: {}
export default function (t, n, r) {
  var e = Math.ceil,
    i = Math.floor
  n.exports = function (t) {
    return isNaN((t = +t)) ? 0 : (0 < t ? i : e)(t)
  }
}
