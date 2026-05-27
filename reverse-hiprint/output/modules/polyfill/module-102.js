// browserify module 102
// deps: {
//   103: 103,
//   140: 140
// }
export default function (t, n, r) {
  var e = t(140),
    i = t(103).f,
    o = {}.toString,
    u =
      'object' == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : []
  n.exports.f = function getOwnPropertyNames(t) {
    return u && '[object Window]' == o.call(t)
      ? (function (t) {
          try {
            return i(t)
          } catch (t) {
            return u.slice()
          }
        })(t)
      : i(e(t))
  }
}
