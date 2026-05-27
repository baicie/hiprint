// browserify module 128
// deps: {
//   64: 64
// }
export default function (t, n, r) {
  'use strict'

  var e = t(64)
  n.exports = function (t, n) {
    return (
      !!t &&
      e(function () {
        n ? t.call(null, function () {}, 1) : t.call(null)
      })
    )
  }
}
